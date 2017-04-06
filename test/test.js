'use strict';

const expect = require('chai').expect;
const alphanuminc = require('../index');

const increment = alphanuminc.increment;
const decrement = alphanuminc.decrement;

describe('#alphaNumInc', function(){

    it('should increment a -> b', function() {
        var result = increment("a");
        expect(result).to.equal("b");
    });

    it('should increment a-- -> baa', function() {
        var result = increment("a--");
        expect(result).to.equal("baa");
    });

    it('should decrement e -> d', function() {
        var result = decrement("e");
        expect(result).to.equal("d");
    });

    it('should decrement azz -> azy', function() {
        var result = decrement("azz");
        expect(result).to.equal("azy");
    });

});
