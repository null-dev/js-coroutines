import {should} from 'chai'
import {compressAsync, decompressAsync, compressToUTF16Async, decompressFromUTF16Async, sortAsync} from '../component'

should()
const INPUT_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
import test from '../component/yastjson/test/test.json'

describe('compression', function () {
    it('should compress a string', async function () {
        let result = await compressAsync('abcde')
        let output = await decompressAsync(result)
        output.should.eq('abcde')
        result.should.eq('ↂテɠꙀ')
    })
    it('should compress a string to UTF 16', async function () {
        let result = await compressToUTF16Async('abcde')
        let output = await decompressFromUTF16Async(result)
        output.should.eq('abcde')
        result.should.eq('ს౑䁬઄  ')
    })
})
