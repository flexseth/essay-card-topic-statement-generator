import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    TextControl,
    TextareaControl,
} from '@wordpress/components';
import {
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';
import './style.scss';
import './editor.scss';

registerBlockType('essay-card-topic-statement-generator/notecard', {
    apiVersion: 2,
    title: __('Essay Notecard', 'essay-card-topic-statement-generator'),
    description: __('Create notecards for essay research and citations.', 'essay-card-topic-statement-generator'),
    category: 'common',
    icon: 'index-card',
    supports: {
        html: false,
    },
    attributes: {
        topicStatement: {
            type: 'string',
            source: 'html',
            selector: '.topic-statement',
        },
        supportingText: {
            type: 'string',
            source: 'html',
            selector: '.supporting-text',
            multiline: 'p',
        },
        sourceTitle: {
            type: 'string',
        },
        sourceAuthor: {
            type: 'string',
        },
        sourceLocation: {
            type: 'string',
        },
        sourceType: {
            type: 'string',
            default: 'book',
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'wp-block-essay-notecard'
        });
        
        const {
            topicStatement,
            supportingText,
            sourceTitle,
            sourceAuthor,
            sourceLocation,
            sourceType,
        } = attributes;

        // Define placeholders with proper escaping
        const placeholders = {
            topicStatement: escapeHTML(__('The Industrial Revolution led to significant environmental changes in 19th century London', 'essay-card-topic-statement-generator')),
            supportingText: escapeHTML(__('Add your research notes and supporting evidence here. For example: Factory emissions and coal burning during the Industrial Revolution created severe air pollution in London, leading to the infamous "Great Smog" of 1952. Contemporary accounts describe thick, yellow-black fogs that would engulf the city for days at a time...', 'essay-card-topic-statement-generator')),
            sourceTitle: escapeHTML(__('The Making of Modern London', 'essay-card-topic-statement-generator')),
            sourceAuthor: escapeHTML(__('Johnson, Sarah M.', 'essay-card-topic-statement-generator')),
            sourceLocation: escapeHTML(__('Page 127 or https://example.com/article', 'essay-card-topic-statement-generator'))
        };

        return (
            <div {...blockProps}>
                <Card>
                    <CardHeader>
                        <TextControl
                            label={__('Topic Statement', 'essay-card-topic-statement-generator')}
                            value={topicStatement}
                            onChange={(value) => setAttributes({ topicStatement: value })}
                            placeholder={placeholders.topicStatement}
                            className="topic-statement-input"
                            // Adding ID for better accessibility
                            id="topic-statement"
                        />
                    </CardHeader>
                    <CardBody>
                        <RichText
                            tagName="div"
                            className="supporting-text"
                            value={supportingText}
                            onChange={(value) => setAttributes({ supportingText: value })}
                            placeholder={placeholders.supportingText}
                            multiline="p"
                            // Adding ID for better accessibility
                            id="supporting-text"
                            // Adding tabIndex to ensure it's in the tab order
                            tabIndex={0}
                            allowedFormats={[
                                'core/bold',
                                'core/italic',
                                'core/link',
                                'core/strikethrough',
                                'core/underline',
                                'core/superscript',
                                'core/subscript',
                                'core/text-color'
                            ]}
                        />
                    </CardBody>
                    <CardFooter>
                        <div className="citation-info">
                            <TextControl
                                label={__('Source Title', 'essay-card-topic-statement-generator')}
                                value={sourceTitle}
                                onChange={(value) => setAttributes({ sourceTitle: value })}
                                placeholder={placeholders.sourceTitle}
                                // Adding ID for better accessibility
                                id="source-title"
                            />
                            <TextControl
                                label={__('Author', 'essay-card-topic-statement-generator')}
                                value={sourceAuthor}
                                onChange={(value) => setAttributes({ sourceAuthor: value })}
                                placeholder={placeholders.sourceAuthor}
                                // Adding ID for better accessibility
                                id="source-author"
                            />
                            <TextControl
                                label={__('Page Number/URL', 'essay-card-topic-statement-generator')}
                                value={sourceLocation}
                                onChange={(value) => setAttributes({ sourceLocation: value })}
                                placeholder={placeholders.sourceLocation}
                                // Adding ID for better accessibility
                                id="source-location"
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    },

    save: ({ attributes }) => {
        const {
            topicStatement,
            supportingText,
            sourceTitle,
            sourceAuthor,
            sourceLocation,
        } = attributes;

        const blockProps = useBlockProps.save({
            className: 'wp-block-essay-notecard'
        });

        return (
            <div {...blockProps}>
                <Card>
                    <CardHeader>
                        <div className="topic-statement">
                            {topicStatement}
                        </div>
                    </CardHeader>
                    
                    <CardBody>
                        <RichText.Content
                            tagName="div"
                            className="supporting-text"
                            value={supportingText}
                        />
                    </CardBody>
                    
                    <CardFooter>
                        <div className="citation-info">
                            <div className="source-entry">
                                <span className="entry-label">{__('Source Title', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-title">{sourceTitle}</div>
                            </div>
                            
                            <div className="source-entry">
                                <span className="entry-label">{__('Author', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-author">{sourceAuthor}</div>
                            </div>
                            
                            <div className="source-entry">
                                <span className="entry-label">{__('Location', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-location">{sourceLocation}</div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    },
});