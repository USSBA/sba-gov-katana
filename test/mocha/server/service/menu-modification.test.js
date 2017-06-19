let sinon = require('sinon');

import inputMenu from "./data/inputMenu.json";
import outputMenu from "./data/outputMenu.json";
import {
    deepPickMenuTree
} from "../../../../src/models/dao/main-menu.js";

describe('menu modification test', function() {



    describe('header navigation menu modification test', function() {
        it('should convert the entire menu properly', function() {
            let result = deepPickMenuTree(inputMenu);
            result.should.not.be.null;
            JSON.stringify(result).should.equal(JSON.stringify(outputMenu));
        })
    });
});