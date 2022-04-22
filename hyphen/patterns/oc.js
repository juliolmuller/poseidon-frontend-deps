(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.hyphenationPatternsOc = factory();
  }
})(this, function () {
  var patterns = [],
    hyphenation = [];

  // title: Hyphenation patterns for Occitan
  // copyright: Copyright (C) 2016 Claudio Beccari
  // notice: This file is part of the hyph-utf8 package.
  //     See http://www.hyphenation.org/tex for more information.
  // language:
  //     name: Occitan
  //     tag: oc
  // version: 0.1 2016/02/04
  // authors:
  //   -
  //     name: Claudio Beccari
  //     contact: claudio.beccari (at) gmail.com
  // licence:
  //     - This file is available under any of the following licences:
  //     -
  //         name: MIT
  //         url: https://opensource.org/licenses/MIT
  //         text: >
  //             Permission is hereby granted, free of charge, to any person
  //             obtaining a copy of this software and associated documentation
  //             files (the “Software”), to deal in the Software without
  //             restriction, including without limitation the rights to use,
  //             copy, modify, merge, publish, distribute, sublicense, and/or sell
  //             copies of the Software, and to permit persons to whom the
  //             Software is furnished to do so, subject to the following
  //             conditions:
  //
  //             The above copyright notice and this permission notice shall be
  //             included in all copies or substantial portions of the Software.
  //
  //             THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
  //             EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  //             OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  //             NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  //             HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  //             WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  //             FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  //             OTHER DEALINGS IN THE SOFTWARE.
  //     -
  //         name: LPL
  //         version: 1
  //         or_later: true
  //         url: https://latex-project.org/lppl/
  // ==========================================
  // Patterns for the Occitan language; they are supposed to be valid
  // for all the Occitan variants spoken and written in the wide area
  // called “Occitanie” by the French. It ranges from the Val d'Aran
  // within Catalunya, to the South Western Italian Alps encompassing
  // the southern half of the French pentagon.
  //
  // For more information please read the babel-occitan documentation.
  //
  var patterns = [
    //
    ".anti1",
    ".anti3m2n",
    ".circu2m1",
    ".e2x1",
    ".para1i",
    ".para1u",
    ".proto1a",
    ".proto1e",
    ".proto1i",
    ".proto1u",
    ".su2b3lu",
    ".su2b3r",
    "3p2sic",
    "3p2neu",
    "1ï",
    "1ü",
    "a1ia",
    "a1ie",
    "a1io",
    "a1iu",
    "a1or.",
    "i1or.",
    "a1oira.",
    "i1oira.",
    "e1iu",
    "1ii.",
    "io1i",
    "o1ia",
    "o1ie",
    "o1io",
    "o1iu",
    "1b",
    "2bb",
    "2bd",
    "b2l",
    "2bm",
    "2bn",
    "b2r",
    "2bt",
    "2bs",
    "2b.",
    "1c",
    "2cc",
    "c2h2",
    "c2l",
    "2cm",
    "2cn",
    "2cq",
    "c2r",
    "2cs",
    "2ct",
    "2cz",
    "2c.",
    "1ç",
    "2ç.",
    "2ch.",
    "1d",
    "2dd",
    "2dg",
    "2dm",
    "d2r",
    "2ds",
    "2dv",
    "2d.",
    "1f",
    "2ff",
    "f2l",
    "2fn",
    "f2r",
    "2ft",
    "2f.",
    "1g",
    "2gg",
    "2gd",
    "2gf",
    "g2l",
    "2gm",
    "2gn",
    "g2r",
    "2gs",
    "g2ü2",
    "2gv",
    "2g.",
    "1h",
    "2hp",
    "2ht",
    "2h.",
    "1j",
    "1k",
    "2kk",
    "k2h2",
    "1l",
    "2lb",
    "2lc",
    "2ld",
    "2lf",
    "l3f2t",
    "2lg",
    "l2h",
    "2lk",
    "2ll",
    "2lm",
    "2ln",
    "2lp",
    "2lq",
    "2lr",
    "2ls",
    "2lt",
    "2lv",
    "2l.",
    "2lh.",
    "1m",
    "2mm",
    "2mb",
    "2mp",
    "2ml",
    "2mn",
    "2mq",
    "2mr",
    "2mv",
    "2m.",
    "1n",
    "2nb",
    "2nc",
    "2nç",
    "2nd",
    "2nf",
    "n2h",
    "2ng",
    "2nj",
    "2nl",
    "2nm",
    "2nn",
    "2np",
    "2nq",
    "2nr",
    "2ns",
    "n2s3m",
    "n2s3f",
    "2nt",
    "2nv",
    "2nx",
    "2n.",
    "2nh.",
    "2ns.",
    "1p",
    "p2h",
    "p2l",
    "2pn",
    "2pp",
    "p2r",
    "2ps",
    "2pt",
    "2pz",
    "2php",
    "2pht",
    "2p.",
    "1q",
    "1qu2",
    "q2ü2",
    "1r",
    "2rb",
    "2rc",
    "2rç",
    "2rd",
    "2rf",
    "2rg",
    "r2h",
    "2rl",
    "2rm",
    "2rn",
    "2rp",
    "2rq",
    "2rr",
    "2rs",
    "2rt",
    "r2ü",
    "2rv",
    "2rz",
    "2r.",
    "2rt.",
    ".s2",
    "1s",
    "2s3ph",
    "2ss",
    "2s2tb",
    "2s2tc",
    "2s2td",
    "2s2tf",
    "2s2tg",
    "2s2t3l",
    "2s2tm",
    "2s2tn",
    "2s2tp",
    "2s2tq",
    "2s2ts",
    "2s2tt",
    "2s2tv",
    "2s.",
    "2st.",
    "2sc.",
    "2sb",
    "2sc",
    "2sd",
    "2sf",
    "2sg",
    "s2h",
    "2sj",
    "2sk",
    "2sl",
    "2sm",
    "2sn",
    "2sp",
    "2sr",
    "2st",
    "2sv",
    "2sz",
    "2sh.",
    "1t",
    "2tb",
    "2tc",
    "2td",
    "2tf",
    "t2g",
    "t2h",
    "t2j",
    "t2l",
    "t2r",
    "2tm",
    "2tn",
    "2tp",
    "2tq",
    "2tt",
    "2tv",
    "t2z",
    "2tg.",
    "2tz.",
    "2t.",
    "1v",
    "v2l",
    "v2r",
    "2vv",
    "1x",
    "2xt",
    "2xx",
    "2x.",
    "1z",
    "2z.",
    "2'2",
    "2b'",
    "2ch'.",
    "2ch''.",
    "2c'",
    "2d'",
    "2f'",
    "2g'",
    "2h'",
    "2j'",
    "2k'",
    "2l'.",
    "2l''",
    "2m'",
    "2n'",
    "2p'",
    "2q'",
    "2r'",
    "2sh'",
    "4s'.",
    "4s''",
    "2t'.",
    "2t''",
    "2v'.",
    "2v''",
    "2w'",
    "2x'",
    "2z'.",
    "2z''",
    ""
  ];

  return {
    patterns: patterns,
    exceptions: hyphenation
  };
});
