'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@spotify-backstage/core');
var React = require('react');
var React__default = _interopDefault(React);
var core$1 = require('@material-ui/core');
var styles = require('@material-ui/core/styles');
var Table = _interopDefault(require('@material-ui/core/Table'));
var TableBody = _interopDefault(require('@material-ui/core/TableBody'));
var TableCell = _interopDefault(require('@material-ui/core/TableCell'));
var TableContainer = _interopDefault(require('@material-ui/core/TableContainer'));
var TableHead = _interopDefault(require('@material-ui/core/TableHead'));
var TableRow = _interopDefault(require('@material-ui/core/TableRow'));
var Alert = _interopDefault(require('@material-ui/lab/Alert'));

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function useMountedState() {
    var mountedRef = React.useRef(false);
    var get = React.useCallback(function () { return mountedRef.current; }, []);
    React.useEffect(function () {
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
    var lastCallId = React.useRef(0);
    var _a = React.useState(initialState), state = _a[0], set = _a[1];
    var isMounted = useMountedState();
    var callback = React.useCallback(function () {
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
    React.useEffect(function () {
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
var useStyles = styles.makeStyles({
    table: {
        minWidth: 650,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: '50%',
    },
});
var DenseTable = function (_a) {
    var users = _a.users;
    var classes = useStyles();
    return (React__default.createElement(TableContainer, null,
        React__default.createElement(Table, { className: classes.table, size: "small", "aria-label": "a dense table" },
            React__default.createElement(TableHead, null,
                React__default.createElement(TableRow, null,
                    React__default.createElement(TableCell, null, "Avatar"),
                    React__default.createElement(TableCell, null, "Name"),
                    React__default.createElement(TableCell, null, "Email"),
                    React__default.createElement(TableCell, null, "Nationality"))),
            React__default.createElement(TableBody, null, users.map(function (user) { return (React__default.createElement(TableRow, { key: user.email },
                React__default.createElement(TableCell, null,
                    React__default.createElement("img", { src: user.picture.medium, className: classes.avatar, alt: user.name.first })),
                React__default.createElement(TableCell, null,
                    user.name.first,
                    " ",
                    user.name.last),
                React__default.createElement(TableCell, null, user.email),
                React__default.createElement(TableCell, null, user.nat))); })))));
};
var ExampleFetchComponent = function () {
    var _a = useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://randomuser.me/api/?results=20')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.results];
            }
        });
    }); }, []), value = _a.value, loading = _a.loading, error = _a.error;
    if (loading) {
        return React__default.createElement(core.Progress, null);
    }
    else if (error) {
        return React__default.createElement(Alert, { severity: "error" }, error.message);
    }
    return React__default.createElement(DenseTable, { users: value || [] });
};

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
var ExampleComponent = function () { return (React__default.createElement(core.Page, { theme: core.pageTheme.tool },
    React__default.createElement(core.Header, { title: "OO to roll!", subtitle: "Optional subtitle" },
        React__default.createElement(core.HeaderLabel, { label: "Owner", value: "Team X" }),
        React__default.createElement(core.HeaderLabel, { label: "Lifecycle", value: "Alpha" })),
    React__default.createElement(core.Content, null,
        React__default.createElement(core.ContentHeader, { title: "Plugin title" },
            React__default.createElement(core.SupportButton, null, "A description of your plugin goes here.")),
        React__default.createElement(core$1.Grid, { container: true, spacing: 3, direction: "column" },
            React__default.createElement(core$1.Grid, { item: true },
                React__default.createElement(core.InfoCard, { title: "Information card", maxWidth: true },
                    React__default.createElement(core$1.Typography, { variant: "body1" }, "All content should be wrapped in a card like this!!!!!!!!!!!!!!!"))),
            React__default.createElement(core$1.Grid, { item: true },
                React__default.createElement(core.InfoCard, { title: "Example User List (fetching data from randomuser.me)" },
                    React__default.createElement(ExampleFetchComponent, null))))))); };

var plugin = core.createPlugin({
    id: 'roll',
    register: function (_a) {
        var router = _a.router;
        router.registerRoute('/roll', ExampleComponent);
    },
});

module.exports = plugin;
//# sourceMappingURL=index.js.map
