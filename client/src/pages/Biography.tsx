import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { profile } from "@/data/profile";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";

type BiographySection = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  bullets?: { label: string; items: string[] }[];
  callout?: { title: string; body: string };
};

const biographyAnchors: PageAnchor[] = [
  { id: "biography-intro", label: "?芣?摰?" },
  { id: "background", label: "?摰?" },
  { id: "legacy-debugging", label: "?日??" },
  { id: "web-performance", label: "Web ??" },
  { id: "implementation", label: "撠皞?" },
  { id: "ai-direction", label: "AI ?孵?" },
  { id: "biography-contact", label: "?舐窗?孵?" },
];

export default function Biography() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${profile.name}${profile.nameEn ? `  ${profile.nameEn}` : ""}`;

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    const speed = 60;
    let rafId: number | null = null;
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) return;
      if (lastTime === 0) lastTime = currentTime;

      if (currentTime - lastTime >= speed && index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index += 1;
        lastTime = currentTime;
      }

      if (index < fullText.length) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [fullText]);

  const sections = useMemo<BiographySection[]>(
    () => [
      {
        id: "background",
        title: "???雿?",
        subtitle: "敺洵銝蝺?撽粥?頂蝯梢???",
        paragraphs: [
          "?Ｘ平?澆遣???憭批飛?芸??極蝔頂嚗?揹撖衣??摩閮毀?箇??敺?澆蝯勗極撱?蝟餅風蝺湛??挾?箏惜蝬?撣嗡?鈭楛?駁???雿踵??渲?圾撖阡?雿平鈭箏?冽?雿頂蝯望???Ｚ?????瘙?銋擗敺蝙?冽?憓?潭?憿?蝧??",
          "撌乩???銝剜?蝣箇?曉?頠???敹梧??迨??瑁?撅?亙??箸??僑?雯?身閮?蝬脰楝?閮毀嚗蒂隞亦洵銝??蝮曄?璆准挾頝券??飛蝧??遣蝡絲蝔???蝷?銋??????潮“撌亦??摩?蝙?刻?撽?蝟餌絞閮剛?閫??",
          "?桀??遙 ERP 蝟餌絞?撌亦?撣恬?鞎痊蝟餌絞???雁霅瑁?????瑟??閫訾?璆剔頂蝯梁???銝哨?瘛祇??箔?憟誑?帘摰蝬剛風??賢??芸????潭雁嚗蒂???典祕?葉撽?閫?捱?????",
        ],
        callout: {
          title: "?詨??孵澆?雿?",
          body: "??頂蝯梢?頛舐蕃霅舀? ? 擃◢?芷?瘙?銵“?撠????瑟?甇瑕?２?頂蝯梧??????圾摨惜?嗆??平??頛荔??曉?祕銝?賢?圾瘙箸獢?",
        },
      },
      {
        id: "legacy-debugging",
        title: "?頂蝯梢?航???",
        subtitle: "敺?閫?頂蝯梢?憪圾瘙箏?憿?",
        paragraphs: [
          "?亙虜撌乩?銝剔?撣賊?閬?亥??洵銝蝺恥???梁?蝟餌絞???撠撩銋??湔?隞嗥??頂蝯梧?敹?敺?憪Ⅳ???澈蝯?銝剖???莎???撖阡?璆剖??摩????蝔???祕?啁憓??寥?鈭?蝟餌絞?啣虜???券◢?芰?擃漲?摨佗?銝衣敞蝛?隞乩???日蝬?嚗?",
          "???蝬?嚗Ⅱ蝡?銝??撖衣?撌乩???嚗?蝣箔?蝟餌絞蝛拙?嚗?摰?圾?摩嚗?敺??脰???嚗?銝?芣??∪鞎??交?孵神蝔???",
        ],
        bullets: [
          {
            label: "??日蝬?嚗????湔?銵敦蝭嚗?",
            items: [
              "蝎暹?摰?閮擃援瞍?Memory Leak嚗?蝪賣璅∠??券????敺?撣貊?璈???餈質馱?拐辣??望?嚗????撱箇???隞塚??蝯移皞?雿蒂靽格迤?芣迤蝣粹??曄?蝔?畾菔?耨甇??嚗撩????Ｗ儔蝛拙?嚗璈???賊?摰Ｚ迄??憭批?????",
              "璇喟? Delphi ?箇?蝟餌絞??航身閮?Delphi ?脤?銴???嚗???蝙?刻翰??銴???撠??質??撣賂???璇喟??Ｘ? Delphi 蝔?蝣澆?嚗??啗身閮?隞嗆?蝔?銝血??亙銵???摰??踹???閫貊嚗?摰???憭?敺拇??嗚耨甇??嚗??蝔撣詨??冽?憭梧?????隤斗?雿葆靘?鞈??航炊憸券??",
              "?∠???啣虜銋????EB_SPECI / CRLF ??嚗?撌亦?霈頧?∠蝟餌絞???潛??典??賊??芣迤蝣箄??乓蔣?踹?蝥鞈潸???閮?嚗? Delphi 蝔??摩?航炊敺?頧?鞈?撅方蕭?乓?摮葡?瑕漲?? ASCII 閫??嚗??EB_SPECI 甈?撠曄垢憭曉葆?梯? CR/LF 摮?嚗??風?脰???瘣?銝血祕雿絞銝摮葡瘛典?璈嚗rim + Replace CR/LF嚗?敺??剜蝯??情??蝣箔?頝函頂蝯望?頧??∟頃撣喳???撠?蝣箝?",
            ],
          },
        ],
      },
      {
        id: "web-performance",
        title: "蝟餌絞 Web ????芸?",
        subtitle: "霈頂蝯曹??芣?賜嚗憟賜",
        paragraphs: [
          "?刻??砍?典?蝟餌絞 Web ??銝餃?銝血?????蝞?潔摯撽??渲蕭?????偷?詻誑?犖鈭?扎???詨?蝟餌絞?瑽?蝘餃極雿?蝔葉銝阡??桃??扳?Ｘ?蝔?蝣潘???瑼Ｚ?璆剖?瘚?嚗?皜?閬郊撽蒂?脰?蝯?蝪∪???",
          "?典?蝡荔????辣?撘?蝯?銴?銝?隤斤??蝞?菜?蝔??唳??雿踵?雿?閬綽?敺垢??嗅??脣?璆剝?頛航??恍鈭辣嚗?雿?撘血?摨佗???敺?蝬剛風?扼?",
          "?刻??偷?貊雯蝡??芸???銝哨?蝟餌絞?Ｚ?＊??園?????憓?嚗???Ｚ??仿漲?湧??脩楨????蝣箄??亥岷瘚?銝剖??典?? N+1 Query ??敺??閮剛?鞈?摮??孵?嚗????亥岷?寧?葉撘甈⊥閰Ｕ?",
        ],
        bullets: [
          {
            label: "??芸???",
            items: [
              "N+1 Query 26 蝘???1 蝘嚗??Ｗ???? 26 蝘葬?剛 1 蝘嚗葆靘??蝙?刻?撽?",
              "鞈?摨怨?頛????葉撘甈⊥閰Ｘ?撠?round-trip嚗?雿?DB 憯?銝行??擃帘摰漲??",
            ],
          },
        ],
      },
      {
        id: "implementation",
        title: "蝟餌絞撠?楊?券?皞?",
        subtitle: "霈頂蝯梁?甇???",
        paragraphs: [
          "撖血?撠?銝哨??曉??????噸????銝?瑹?璆剔? ERP 蝟餌絞撠??撠???瑟??唳抒?敺敺?舀風?脰????撠撘??釭?榆銝???鞈?嚗???撖阡?雿平瘚??脰?皜???撠?撽?嚗Ⅱ靽?頂蝯梯????",
          "甇文?嚗漲?曉?敺?潛????箝移?唾???撱箄身蝑?湛??Ｗ?蝞∠?撅方?蝚砌?蝺蝙?刻脰??閮毀??獢陛?晞?蝚砌?蝺???撽?蝯???典蝯勗極撱?甇瑞毀嚗蝙?典?獢葉?賜移皞??∩????脩??瘙榆?堆?銝血??挾??雿蔡?脤閮剛?嚗Ⅱ靽頂蝯勗?祕?啣?銝剛蝛拙?????",
        ],
        bullets: [
          {
            label: "撠??雿?暺?",
            items: [
              "ERP 撠???脰?蝺湛??啣蝪∪??雿?摮詻?蝔?朣????嗆???",
              "鞈?頧?嚗???撠?霅?蝣箔??啗?蝟餌絞?∠葦???",
            ],
          },
        ],
      },
      {
        id: "ai-direction",
        title: "AI ?銵脖耨?靘??",
        paragraphs: [
          "?箔?撠頂蝯梢??潸???銵????桀?撠梯??澆蔑?葦蝭之摮貉?閮極蝔?蝛嗆?蝣拙ㄚ?哨?撠釣??AI ?拐辣?菜葫?蔣?儘霅???",
          "?典祕雿?ｇ?撌脰?毀? Python ?楛摨血飛蝧??塚?摰?????箏皜研???蔣????撠?嚗蒂???芸?璅∪???頂蝯望???",
          "?湧???嚗靘???撠?AI ?銵祕鞈芣?脖?璆剜??其葉嚗????帘摰?雿??游??批??賢????頂蝯晞?",
        ],
        bullets: [
          {
            label: "AI 撠?嚗????菜?銵??",
            items: ["AI ?游?銵?菜葫??蔣????"],
          },
        ],
      },
    ],
    []
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`Biography | ${profile.name}`}
        description="ERP 蝟餌絞?撌亦?撣恬??箇?蝟餌絞?日??瑽eb ????芸??RP 撠???脰?蝺氬I ?拐辣?菜葫?蔣?儘霅?"
        canonicalPath="/biography"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
              >
                擐?
              </Link>

              <h1 className="font-mono text-sm text-slate-400">?芸</h1>

              <div className="flex items-center gap-4">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  撅交風
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/experience"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Experience
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  撠?
                </Link>
              </div>
            </div>
          </nav>

          <div className="mx-auto max-w-4xl px-6 pb-10 pt-12 sm:pt-16">
            <header id="biography-intro" className="scroll-mt-24 space-y-6">
              <h2
                className="text-4xl font-bold text-cyan-400 md:text-5xl"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {displayedText}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                ?銝?誑?帘摰蝬剛風??賢??芸???ERP
                蝟餌絞?撌亦?撣恬??敺洵銝蝺蝙?冽?憓?潘?撠?頂蝯梁?璆剖??摩皜?蝧餉陌?箏蝬剛風??游??圾瘜?
              </p>
            </header>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 pb-16 xl:grid-cols-[180px_minmax(0,1fr)]">
            <PageAnchorNav anchors={biographyAnchors} />

            <main className="min-w-0 space-y-10 sm:space-y-12 xl:max-w-4xl">
              <div className="space-y-10 sm:space-y-12">
                {sections.map(section => (
                  <section
                    id={section.id}
                    key={section.title}
                    className="scroll-mt-24 space-y-6 rounded-2xl border border-slate-700/40 bg-slate-900/20 p-6 sm:p-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-cyan-300">
                        {section.title}
                      </h3>
                      {section.subtitle ? (
                        <p className="text-sm text-slate-400">
                          {section.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-4 text-slate-300 leading-relaxed">
                      {section.paragraphs.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.bullets?.map(group => (
                      <div
                        key={group.label}
                        className="space-y-3 rounded-xl border border-slate-700/40 bg-slate-950/40 p-5"
                      >
                        <p className="font-medium text-slate-200">
                          {group.label}
                        </p>
                        <ul className="list-disc space-y-2 pl-5 text-slate-300">
                          {group.items.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {section.callout ? (
                      <div className="space-y-2 rounded-xl border border-cyan-500/25 bg-cyan-500/10 p-5">
                        <p className="font-medium text-cyan-200">
                          {section.callout.title}
                        </p>
                        <p className="leading-relaxed text-slate-200">
                          {section.callout.body}
                        </p>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <section
                id="biography-contact"
                className="scroll-mt-24 space-y-4"
              >
                <h3 className="text-2xl font-bold text-cyan-300">Contact</h3>

                <div className="flex flex-wrap gap-3">
                  <a
                    className="rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-cyan-200 transition-colors hover:bg-cyan-500/30"
                    href={`mailto:${profile.contact.email}`}
                  >
                    Email
                  </a>
                  <a
                    className="rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800/60"
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800/60"
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </section>

              <div className="h-8" />
            </main>
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
