import React from 'react'
/*eslint-enable no-unused-vars*/
import { SizeStandardsTool } from 'organisms'
import {
  StartScreen,
  NaicsScreen,
  RevenueScreen,
  EmployeesScreen,
  ResultsScreen
} from 'organisms/size-standards-tool/size-standards-tool.jsx'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('SizeStandardsTool', () => {
  test('should match snapshot', () => {
    const tree = renderer.create(<SizeStandardsTool />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('StartScreen', () => {
    test('should match snapshot', () => {
      const tree = renderer.create(<StartScreen />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('NaicsScreen', () => {
    const testProps = {
      selectedNaicsCodes: [
        {
          id: '111130',
          description: 'Dry Pea and Bean Farming',
          sectorId: '11',
          sectorDescription: 'Agriculture, Forestry, Fishing and Hunting',
          subsectorId: '111',
          subsectorDescription: 'Crop Production',
          revenueLimit: null,
          employeeCountLimit: 100,
          footnote: null,
          parent: null
        }
      ]
    }

    test('should match snapshot', () => {
      const tree = renderer.create(<NaicsScreen {...testProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('RevenueScreen', () => {
    const mockFunction = jest.fn()

    const testProps = {
      setFocusTo: mockFunction
    }

    test('should match snapshot', () => {
      const tree = renderer.create(<RevenueScreen {...testProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('EmployeesScreen', () => {
    const mockFunction = jest.fn()

    const testProps = {
      setFocusTo: mockFunction
    }

    test('should match snapshot', () => {
      const tree = renderer.create(<EmployeesScreen {...testProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('ResultsScreen', () => {
    const testProps = {
      naicsCodes: [
        {
          id: '111130',
          description: 'Dry Pea and Bean Farming',
          sectorId: '11',
          sectorDescription: 'Agriculture, Forestry, Fishing and Hunting',
          subsectorId: '111',
          subsectorDescription: 'Crop Production',
          revenueLimit: null,
          employeeCountLimit: 100,
          footnote: null,
          parent: null
        },
        {
          id: '541715',
          description:
            'Research and Development in the Physical, Engineering, and Life Sciences (except Nanotechnology and Biotechnology) ',
          sectorId: '54',
          sectorDescription: 'Professional, Scientific and Technical Services',
          subsectorId: '541',
          subsectorDescription: 'Professional, Scientific and Technical Services',
          revenueLimit: null,
          employeeCountLimit: 1000,
          footnote: [],
          parent: null,
          assetLimit: null
        },
        {
          id: '541715_a_Except',
          description: 'Aircraft, Aircraft Engine and Engine Parts11',
          sectorId: '54',
          sectorDescription: 'Professional, Scientific and Technical Services',
          subsectorId: '541',
          subsectorDescription: 'Professional, Scientific and Technical Services',
          revenueLimit: null,
          employeeCountLimit: 1500,
          footnote: 'NAICS Codes 541713, 541714 and 541715',
          parent: '111110'
        }
      ],
      selectedNaicsCodes: [
        {
          id: '111130',
          description: 'Dry Pea and Bean Farming',
          sectorId: '11',
          sectorDescription: 'Agriculture, Forestry, Fishing and Hunting',
          subsectorId: '111',
          subsectorDescription: 'Crop Production',
          revenueLimit: null,
          employeeCountLimit: 100,
          footnote: null,
          parent: null,
          isSmallBusiness: true,
          code: '111130'
        }
      ]
    }

    test('should match snapshot', () => {
      const tree = renderer.create(<ResultsScreen {...testProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
