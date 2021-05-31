import { SchemaType } from '../../types'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { topicsList } from '../../helpers/topics'
import { AlignmentSelector, ImageSizeSelector } from '../components'
import { Colors } from '../../helpers/ColorListValues'
import blocksToText from '../../helpers/blocksToText'

const topicPages = topicsList.map((topic: any) => ({ type: `page_${topic.id}` }))

const validateContent = (value: any, maxLength: number) => {
  if (!value) return true

  const plainText = blocksToText(value)

  if (plainText.length > maxLength) {
    return `Content should be short and concise.`
  }

  return true
}

const validateLink = (value: any, connectedField: any): SchemaType.ValidationResult => {
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!connectedField && !value) {
    return 'An internal or external link is required.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  name: 'teaser',
  title: 'Teaser',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Header',
      name: 'header',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Select either an internal link or external URL.',
    },
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'overline',
      title: 'Overline',
      type: 'string',
      fieldset: 'header',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'header',
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any) => validateContent(value, 600)).warning(),
    },
    {
      name: 'linkLabel',
      title: 'Link label',
      type: 'string',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'reference',
      title: 'Internal link',
      type: 'reference',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.url)
        }),
      to: topicPages,
      fieldset: 'link',
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.reference)
        }),
      to: topicPages,
      fieldset: 'link',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'imagePosition',
      title: 'Image position',
      description: 'Select which side of the teaser the image should be displayed at on larger screens.',
      type: 'string',
      inputComponent: AlignmentSelector,
      fieldset: 'design',
    },
    {
      name: 'imageSize',
      title: 'Image size',
      description: 'Select whether the image should be full size or have padding around it',
      type: 'string',
      fieldset: 'design',
      inputComponent: ImageSizeSelector,
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image.asset',
      slug: 'reference.slug.current',
      url: 'url',
    },
    prepare(selection: any) {
      const { title, image, slug, url } = selection
      return {
        title: title,
        subtitle: `Teaser for: ${slug || url}`,
        media: image,
      }
    },
  },
}
