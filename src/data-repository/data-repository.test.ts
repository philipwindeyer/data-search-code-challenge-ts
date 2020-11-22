import {expect} from 'chai'
import {getData} from '../../src/data-repository'

describe('dataRepository', () => {
  describe('#getData', () => {
    let result: ReturnType<typeof getData>

    beforeEach(() => {
      result = getData()
    })

    it('build data collections from json data files', () => {
      expect(result.organizations).to.be.an('array')
      expect(result.tickets).to.be.an('array')
      expect(result.users).to.be.an('array')
    })
  })
})
