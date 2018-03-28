import React from 'react'
import { compact } from 'lodash'

import { ImageSection, SectionHeader, SubsectionHeader, TextSection } from 'atoms'
import { ButtonCta, CallToAction, QuickLinks, ReadMoreSection } from 'molecules'
import {
  CardCollection,
  Lookup,
  MenuTileCollection,
  ProgramDetailsCardCollection,
  SearchBox,
  StyleGrayBackground,
  TextReadMoreSection
} from 'organisms'
import { panelMenuContainer } from './homepage/homepage.scss'

function makeParagraphs(
  paragraphData = [],
  optionalSectionHeaderFunction,
  lineage,
  paragraphEventConfig = {},
  // TODO: organize parameters to make sense
  sectionData = {}
) {
  let paragraphs = []
  let skipNextReadmore = false
  paragraphs = paragraphData.map(function(item, index, paragraphArray) {
    let paragraph = <p>{JSON.stringify(item)}</p>
    let paragraphType = item.type
    if (item && item.type) {
      // Google Analytics Event
      const eventConfig = paragraphEventConfig[item.type]
      if (item.type === 'readMore') {
        if (skipNextReadmore) {
          skipNextReadmore = false
          return null
        } else {
          const readmoreProps = {
            parentId: '-read-more',
            readMoreSectionItem: item
          }
          paragraph = <ReadMoreSection {...readmoreProps} />
        }
      } else if (item.type === 'textSection') {
        const next = paragraphArray.length >= index + 1 ? paragraphArray[index + 1] : null
        if (next && next.type === 'readMore') {
          paragraphType = 'textReadMoreSection'
          paragraph = (
            <TextReadMoreSection
              parentId={'text-readmore-section-' + index}
              textSectionItem={item}
              readMoreSectionItem={next}
            />
          )
          skipNextReadmore = true
        } else {
          paragraph = <TextSection text={item.text} />
        }
      } else if (item.type === 'sectionHeader') {
        const sectionHeaderFunction = optionalSectionHeaderFunction || makeSectionHeaderId
        paragraph = <SectionHeader refId={sectionHeaderFunction(index)} text={item.text} />
      } else if (item.type === 'subsectionHeader') {
        paragraph = <SubsectionHeader text={item.text} />
      } else if (item.type === 'image') {
        paragraph = <ImageSection imageObj={item.image} captionText={item.captionText} />
      } else if (item.type === 'lookup') {
        paragraph = (
          <Lookup
            title={item.sectionHeaderText}
            type="contacts"
            subtype={item.contactCategory}
            display={item.display}
            eventConfig={eventConfig}
          />
        )
      } else if (item.type === 'callToAction') {
        if (eventConfig) {
          eventConfig.action = item.btnTitle
        }
        paragraph = (
          <CallToAction
            size={item.style}
            headline={item.headline}
            blurb={item.blurb}
            image={item.image}
            imageAlt={item.imageAlt}
            btnTitle={item.btnTitle}
            btnUrl={item.btnUrl}
            title={item.title}
            eventConfig={eventConfig}
          />
        )
      } else if (item.type === 'cardCollection') {
        paragraph = <CardCollection parentIndex={index} cards={item.cards} />
      } else if (item.type === 'styleGrayBackground') {
        paragraph = <StyleGrayBackground parentIndex={index} key={index} paragraphs={item.paragraphs} />
      } else if (item.type === 'button') {
        if (eventConfig) {
          eventConfig.action = item.link.title
        }
        paragraph = (
          <ButtonCta key={index} url={item.link.url} title={item.link.title} eventConfig={eventConfig} />
        )
      } else if (item.type === 'quickLinks') {
        paragraph = <QuickLinks data={item} />
      } else if (item.type === 'searchBox') {
        const { sectionHeaderText, subtitleText } = item
        const searchBoxProps = {
          sectionHeaderText,
          subtitleText
        }

        paragraph = <SearchBox {...searchBoxProps} />
      } else if (item.type === 'childPageMenu' && item.pagesInclude === 'All child pages') {
        const cards = lineage[lineage.length - 1].children
        paragraph = <ProgramDetailsCardCollection cards={cards} eventConfig={eventConfig} />
      } else if (item.type === 'panelMenu') {
        // TODO: fix hard-coding of pathname
        paragraph = (
          <div className={panelMenuContainer}>
            <MenuTileCollection data={sectionData.children} pathname="/" />
          </div>
        )
      }
    }
    return {
      type: paragraphType,
      paragraph: paragraph
    }
  })

  return compact(paragraphs)
}

function wrapParagraphs(paragraphsList, wrapperClassMapping) {
  return paragraphsList.map((item, index) => {
    let paragraphGridStyle = wrapperClassMapping[item.type]
    if (!paragraphGridStyle) {
      paragraphGridStyle = wrapperClassMapping.other
    }
    return (
      <div key={index} id={item.type + '-' + index} className={paragraphGridStyle}>
        <div id={'paragraph-' + (index + 1)}>{item.paragraph}</div>
      </div>
    )
  })
}

function makeSectionHeaderId(index) {
  const sectionHeaderId = 'section-header-' + index
  return sectionHeaderId
}

export { makeParagraphs, wrapParagraphs, makeSectionHeaderId }
