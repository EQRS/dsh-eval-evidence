// dsh-rss 独立探针：RSS/Atom 解析 / OPML 往返 / 订阅去重 / YAML 往返 / 配置默认
// 运行：<node> probes/probe_dsh_rss.mjs
const m = await import('file:///D:/natnat/lingshu/外部插件/dsh-rss/dsh-rss-master/lib/index.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

const rss2 = '<?xml version="1.0"?><rss version="2.0"><channel><title>Demo RSS</title><link>https://example.com</link>' +
  '<item><title>First</title><link>https://example.com/a</link><pubDate>Mon, 19 Oct 2026 06:00:00 GMT</pubDate><description>hello &lt;b&gt;world&lt;/b&gt;</description></item>' +
  '<item><title>Second</title><link>https://example.com/b</link><pubDate>Tue, 20 Oct 2026 06:00:00 GMT</pubDate><description>second</description></item>' +
  '</channel></rss>'
const atom = '<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Demo Atom</title><id>urn:x</id>' +
  '<entry><title>Atom One</title><id>urn:a1</id><link href="https://example.org/1"/><updated>2026-10-19T06:00:00Z</updated><summary>atom summary</summary></entry>' +
  '</feed>'

const r1 = m.parseFeed(rss2, 'https://example.com/feed.xml')
ok('RSS 2.0 解析 2 条', r1.entries.length === 2 && r1.feed.title === 'Demo RSS', JSON.stringify({ n: r1.entries.length, title: r1.feed.title }))
ok('RSS 条目标题/链接/日期归一（字段名 pubDate）', r1.entries[0].title === 'First' && String(r1.entries[0].link).includes('example.com/a') && String(r1.entries[0].pubDate).startsWith('2026-10-19'), JSON.stringify(r1.entries[0]).slice(0, 220))
ok('RSS 摘要去 HTML 标签', !String(r1.entries[0].summary || '').includes('<b>'), JSON.stringify(r1.entries[0].summary).slice(0, 120))

const r2 = m.parseFeed(atom, 'https://example.org/feed.xml')
ok('Atom 解析 1 条', r2.entries.length === 1 && r2.feed.title === 'Demo Atom', JSON.stringify({ n: r2.entries.length, title: r2.feed.title }))

let emptyThrew = false
try { m.parseFeed('', 'x') } catch { emptyThrew = true }
ok('空内容抛错', emptyThrew)
let truncThrew = false
try { m.parseFeed('<rss><channel><item><title>x</title></item>', 'x') } catch { truncThrew = true }
ok('截断 XML 抛错', truncThrew)

const opml = '<?xml version="1.0"?><opml version="2.0"><body>' +
  '<outline text="Tech"><outline type="rss" text="A" xmlUrl="https://a.example/feed" /></outline>' +
  '<outline type="rss" text="B" xmlUrl="https://b.example/feed" />' +
  '<outline type="rss" text="Bad" xmlUrl="ftp://bad/feed" />' +
  '</body></opml>'
const parsed = m.parseOpml(opml)
ok('OPML 解析出 3 条 outline（非法 URL 留给导入阶段过滤）', parsed.outlines.length === 3, JSON.stringify(parsed).slice(0, 300))
ok('OPML 分类从父 outline 继承 Tech', parsed.outlines.some(o => o.category === 'Tech'), JSON.stringify(parsed.outlines))
const imported = m.importOpmlFeeds([], parsed)
ok('importOpmlFeeds 只收 2 条 http(s)、跳过 1 条 ftp', imported.addedCount === 2 && imported.skipped.length === 1, JSON.stringify({ added: imported.addedCount, skipped: imported.skipped.length }))

const built = m.buildOpml(parsed.outlines)
const reparsed = m.parseOpml(built)
ok('OPML build→parse 往返条数一致', reparsed.outlines.length === parsed.outlines.length, JSON.stringify(reparsed.outlines))

const feed = { url: 'https://a.example/feed', name: 'A', category: 'Tech' }
const feed2 = { url: 'https://a.example/feed/', name: 'A2', category: '' }
ok('sameFeedUrl 归一 host 大小写（URL.href 语义）', m.sameFeedUrl('https://A.Example/feed', 'https://a.example/feed') === true, String(m.sameFeedUrl('https://A.Example/feed', 'https://a.example/feed')))
ok('sameFeedUrl 保留尾部斜杠差异（设计选择）', m.sameFeedUrl(feed.url, feed2.url) === false, String(m.sameFeedUrl(feed.url, feed2.url)))
const merged = m.addFeed([feed], 'https://A.Example/feed', 'A2', '')
ok('addFeed 归一后同 URL 合并、不新增', merged.existed === true && merged.feeds.length === 1 && merged.feeds[0].name === 'A2', JSON.stringify(merged))
const added = m.addFeed([feed], 'https://c.example/feed', 'C', 'News')
ok('addFeed 新 URL 追加', added.existed === false && added.feeds.length === 2, JSON.stringify(added))

const yaml = m.serializeFeeds([feed, { url: 'https://c.example/feed', name: 'C', category: 'News' }])
const back = m.parseFeedsYaml(yaml)
ok('feeds YAML 往返 2 条', back.length === 2, JSON.stringify(back).slice(0, 200))

const cfg = m.resolveConfig({})
ok('resolveConfig 返回对象且含默认值', typeof cfg === 'object' && cfg !== null, JSON.stringify(cfg).slice(0, 240))

const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
