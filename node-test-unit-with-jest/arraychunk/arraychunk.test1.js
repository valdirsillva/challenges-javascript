const assert = require('assert')
const chunk = require('./arraychunk')

describe('Array Chunking', () => {
    it('should create chunks of a specific size',  () => {
        // assert.deepStrictEqual(chunk([1, 2, 3, 4], 2), [[1, 2],  [3, 4]]);
        assert.deepStrictEqual(chunk([1, 2, 3, 4], 3), [[1, 2, 3],  [4, 5, 6]]);
    })
})