import buildMatchFn from "../../../_lib/buildMatchFn/index.js";
import buildMatchPatternFn from "../../../_lib/buildMatchPatternFn/index.js";
var matchOrdinalNumberPattern = /^(\d+)(èr|nd|en)?[a]?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(ab\.J\.C|apr\.J\.C|apr\.J\.-C)/i,
  abbreviated: /^(ab\.J\.-C|ab\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(abans Jèsus-Crist|après Jèsus-Crist)/i
};
var parseEraPatterns = {
  any: [/^ab/i, /^ap/i]
};
var matchQuarterPatterns = {
  narrow: /^T[1234]/i,
  abbreviated: /^[1234](èr|nd|en)? trim\.?/i,
  wide: /^[1234](èr|nd|en)? trimèstre/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(GN|FB|MÇ|AB|MA|JN|JL|AG|ST|OC|NV|DC)/i,
  abbreviated: /^(gen|febr|març|abr|mai|junh|jul|ag|set|oct|nov|dec)\.?/i,
  wide: /^(genièr|febrièr|març|abril|mai|junh|julhet|agost|setembre|octòbre|novembre|decembre)/i
};
var parseMonthPatterns = {
  any: [/^g/i, /^f/i, /^ma[r?]|MÇ/i, /^ab/i, /^ma[i?]/i, /^ju[n?]|JN/i, /^ju[l?]|JL/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^d[glmcjvs]\.?/i,
  short: /^d[glmcjvs]\.?/i,
  abbreviated: /^d[glmcjvs]\.?/i,
  wide: /^(dimenge|diluns|dimars|dimècres|dijòus|divendres|dissabte)/i
};
var parseDayPatterns = {
  narrow: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  short: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  abbreviated: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  any: [/^dg|dime/i, /^dl|dil/i, /^dm|dima/i, /^dc|dimè/i, /^dj|dij/i, /^dv|div/i, /^ds|dis/i]
};
var matchDayPeriodPatterns = {
  any: /(^(a\.?m|p\.?m))|(ante meridiem|post meridiem)|((del |de la |de l’)(matin|aprèp-miègjorn|vèspre|ser|nuèch))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /(^a)|ante meridiem/i,
    pm: /(^p)|post meridiem/i,
    midnight: /^mièj/i,
    noon: /^mièg/i,
    morning: /matin/i,
    afternoon: /aprèp-miègjorn/i,
    evening: /vèspre|ser/i,
    night: /nuèch/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
export default match;