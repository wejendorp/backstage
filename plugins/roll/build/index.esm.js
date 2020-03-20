import { Progress, Page, pageTheme, Header, HeaderLabel, Content, ContentHeader, SupportButton, InfoCard, createPlugin } from '@spotify-backstage/core';
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';

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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var useStyles = makeStyles({
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
    return (React.createElement(TableContainer, null,
        React.createElement(Table, { className: classes.table, size: "small", "aria-label": "a dense table" },
            React.createElement(TableHead, null,
                React.createElement(TableRow, null,
                    React.createElement(TableCell, null, "Avatar"),
                    React.createElement(TableCell, null, "Name"),
                    React.createElement(TableCell, null, "Email"),
                    React.createElement(TableCell, null, "Nationality"))),
            React.createElement(TableBody, null, users.map(function (user) { return (React.createElement(TableRow, { key: user.email },
                React.createElement(TableCell, null,
                    React.createElement("img", { src: user.picture.medium, className: classes.avatar, alt: user.name.first })),
                React.createElement(TableCell, null,
                    user.name.first,
                    " ",
                    user.name.last),
                React.createElement(TableCell, null, user.email),
                React.createElement(TableCell, null, user.nat))); })))));
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
        return React.createElement(Progress, null);
    }
    else if (error) {
        return React.createElement(Alert, { severity: "error" }, error.message);
    }
    return React.createElement(DenseTable, { users: value || [] });
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
var ExampleComponent = function () { return (React.createElement(Page, { theme: pageTheme.tool },
    React.createElement(Header, { title: "OO to Yooo!", subtitle: "Optional subtitle" },
        React.createElement(HeaderLabel, { label: "Owner", value: "Team X" }),
        React.createElement(HeaderLabel, { label: "Lifecycle", value: "Alpha" })),
    React.createElement(Content, null,
        React.createElement(ContentHeader, { title: "Plugin title" },
            React.createElement(SupportButton, null, "A description of your plugin goes here.")),
        React.createElement(Grid, { container: true, spacing: 3, direction: "column" },
            React.createElement(Grid, { item: true },
                React.createElement(InfoCard, { title: "Information card", maxWidth: true },
                    React.createElement(Typography, { variant: "body1" }, "All content should be wrapped in a card like this!!!!!!!!!!!!!!!"))),
            React.createElement(Grid, { item: true },
                React.createElement(InfoCard, { title: "Example User List (fetching data from randomuser.me)" },
                    React.createElement(ExampleFetchComponent, null))))))); };

var plugin = createPlugin({
    id: 'roll',
    register: function (_a) {
        var router = _a.router;
        router.registerRoute('/roll', ExampleComponent);
    },
});

export default plugin;
//# sourceMappingURL=index.esm.js.map
