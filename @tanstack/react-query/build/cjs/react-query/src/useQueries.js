/**
 * react-query
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var shim = require('use-sync-external-store/shim');
var index = require('../../query-core/build/esm/index.js');
var QueryClientProvider = require('./QueryClientProvider.js');
var isRestoring = require('./isRestoring.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// - `context` is omitted as it is passed as a root-level option to `useQueries` instead.

function useQueries({
  queries,
  context
}) {
  const queryClient = QueryClientProvider.useQueryClient({
    context
  });
  const isRestoring$1 = isRestoring.useIsRestoring();
  const defaultedQueries = React__namespace.useMemo(() => queries.map(options => {
    const defaultedOptions = queryClient.defaultQueryOptions(options); // Make sure the results are already in fetching state before subscribing or updating options

    defaultedOptions._optimisticResults = isRestoring$1 ? 'isRestoring' : 'optimistic';
    return defaultedOptions;
  }), [queries, queryClient, isRestoring$1]);
  const [observer] = React__namespace.useState(() => new index.QueriesObserver(queryClient, defaultedQueries));
  const result = observer.getOptimisticResult(defaultedQueries);
  shim.useSyncExternalStore(React__namespace.useCallback(onStoreChange => isRestoring$1 ? () => undefined : observer.subscribe(index.notifyManager.batchCalls(onStoreChange)), [observer, isRestoring$1]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
  React__namespace.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setQueries(defaultedQueries, {
      listeners: false
    });
  }, [defaultedQueries, observer]);
  return result;
}

exports.useQueries = useQueries;
//# sourceMappingURL=useQueries.js.map
