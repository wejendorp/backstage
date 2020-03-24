import { Progress, Page, pageTheme, Header, HeaderLabel, Content, ContentHeader, SupportButton, InfoCard, createPlugin } from '@spotify-backstage/core';
import React__default, { useRef, useCallback, useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function useMountedState() {
    var mountedRef = useRef(false);
    var get = useCallback(function () { return mountedRef.current; }, []);
    useEffect(function () {
        mountedRef.current = true;
        return function () {
            mountedRef.current = false;
        };
    });
    return get;
}

/* eslint-disable */
function useAsyncFn(fn, deps, initialState) {
    if (deps === void 0) { deps = []; }
    if (initialState === void 0) { initialState = { loading: false }; }
    var lastCallId = useRef(0);
    var _a = useState(initialState), state = _a[0], set = _a[1];
    var isMounted = useMountedState();
    var callback = useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callId = ++lastCallId.current;
        set({ loading: true });
        return fn.apply(void 0, args).then(function (value) {
            isMounted() && callId === lastCallId.current && set({ value: value, loading: false });
            return value;
        }, function (error) {
            isMounted() && callId === lastCallId.current && set({ error: error, loading: false });
            return error;
        });
    }, deps);
    return [state, callback];
}

function useAsync(fn, deps) {
    if (deps === void 0) { deps = []; }
    var _a = useAsyncFn(fn, deps, {
        loading: true,
    }), state = _a[0], callback = _a[1];
    useEffect(function () {
        callback();
    }, [callback]);
    return state;
}

/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: '50%',
    },
});
const DenseTable = ({ users }) => {
    const classes = useStyles();
    return (React__default.createElement(TableContainer, null,
        React__default.createElement(Table, { className: classes.table, size: "small", "aria-label": "a dense table" },
            React__default.createElement(TableHead, null,
                React__default.createElement(TableRow, null,
                    React__default.createElement(TableCell, null, "Avatar"),
                    React__default.createElement(TableCell, null, "Name"),
                    React__default.createElement(TableCell, null, "Email"),
                    React__default.createElement(TableCell, null, "Nationality"))),
            React__default.createElement(TableBody, null, users.map(user => (React__default.createElement(TableRow, { key: user.email },
                React__default.createElement(TableCell, null,
                    React__default.createElement("img", { src: user.picture.medium, className: classes.avatar, alt: user.name.first })),
                React__default.createElement(TableCell, null,
                    user.name.first,
                    " ",
                    user.name.last),
                React__default.createElement(TableCell, null, user.email),
                React__default.createElement(TableCell, null, user.nat))))))));
};
const ExampleFetchComponent = () => {
    const { value, loading, error } = useAsync(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('https://randomuser.me/api/?results=20');
        const data = yield response.json();
        return data.results;
    }), []);
    if (loading) {
        return React__default.createElement(Progress, null);
    }
    else if (error) {
        return React__default.createElement(Alert, { severity: "error" }, error.message);
    }
    return React__default.createElement(DenseTable, { users: value || [] });
};

const img = require('./apple-touch-icon.png');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".test {\n  color: papayawhip;\n  background: rebeccapurple;\n}\n";
styleInject(css_248z);

/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ExampleComponent = () => (React__default.createElement(Page, { theme: pageTheme.tool },
    React__default.createElement(Header, { title: "OO to coolio!", subtitle: "Optional subtitle" },
        React__default.createElement(HeaderLabel, { label: "Owner", value: "Team X" }),
        React__default.createElement(HeaderLabel, { label: "Lifecycle", value: "Alpha" })),
    React__default.createElement(Content, null,
        React__default.createElement(ContentHeader, { title: "Plugin title" },
            React__default.createElement(SupportButton, null, "A description of your plugin goes here.")),
        React__default.createElement(Grid, { container: true, spacing: 3, direction: "column" },
            React__default.createElement(Grid, { item: true },
                React__default.createElement(InfoCard, { title: "Information card", maxWidth: true },
                    React__default.createElement("img", { src: img }),
                    React__default.createElement(Typography, { variant: "body1", className: "test" }, "All content should be wrapped in a card like this!!!!!!!!!!!!!!!"))),
            React__default.createElement(Grid, { item: true },
                React__default.createElement(InfoCard, { title: "Example User List (fetching data from randomuser.me)" },
                    React__default.createElement(ExampleFetchComponent, null)))))));

var plugin = createPlugin({
    id: 'roll',
    register({ router }) {
        router.registerRoute('/roll', ExampleComponent);
    },
});

export default plugin;
//# sourceMappingURL=index.esm.js.map
