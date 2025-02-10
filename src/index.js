import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    TextControl,
    ToggleControl,
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
        showCitation: {
            type: 'boolean',
            default: false,
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
            showCitation,
        } = attributes;

        const placeholders = {
            topicStatement: escapeHTML(__('The Industrial Revolution led to significant environmental changes in 19th century London', 'essay-card-topic-statement-generator')),
            supportingText: escapeHTML(__('Add your research notes and supporting evidence here...', 'essay-card-topic-statement-generator')),
            sourceTitle: escapeHTML(__('The Making of Modern London', 'essay-card-topic-statement-generator')),
            sourceAuthor: escapeHTML(__('Johnson, Sarah M.', 'essay-card-topic-statement-generator')),
            sourceLocation: escapeHTML(__('Page 127 or https://example.com/article', 'essay-card-topic-statement-generator'))
        };

        return (
            <div {...blockProps}>
                <Card>
                    <CardHeader>
                        <div className="header-left">
                            <TextControl
                                label={__('Topic Statement', 'essay-card-topic-statement-generator')}
                                value={topicStatement}
                                onChange={(value) => setAttributes({ topicStatement: value })}
                                placeholder={placeholders.topicStatement}
                                className="topic-statement-input"
                                id="topic-statement"
                            />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <RichText
                            tagName="div"
                            className="supporting-text"
                            value={supportingText}
                            onChange={(value) => setAttributes({ supportingText: value })}
                            placeholder={placeholders.supportingText}
                            multiline="p"
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
                        <div className="citation-controls">
                            <div className="citation-top">
                                <div className="citation-toggle">
                                    <ToggleControl
                                        label={__('CITATION', 'essay-card-topic-statement-generator')}
                                        checked={showCitation}
                                        onChange={(value) => setAttributes({ showCitation: value })}
                                        labelPosition="left"
                                    />
                                </div>
                                {showCitation && (
                                    <div className="source-title-wrapper">
                                        <label htmlFor="source-title">{__('Source Title:', 'essay-card-topic-statement-generator')}</label>
                                        <TextControl
                                            value={sourceTitle}
                                            onChange={(value) => setAttributes({ sourceTitle: value })}
                                            placeholder={placeholders.sourceTitle}
                                            id="source-title"
                                        />
                                    </div>
                                )}
                            </div>
                            {showCitation && (
                                <div className="citation-fields">
                                    <div className="footer-left">
                                        <TextControl
                                            label={__('Author', 'essay-card-topic-statement-generator')}
                                            value={sourceAuthor}
                                            onChange={(value) => setAttributes({ sourceAuthor: value })}
                                            placeholder={placeholders.sourceAuthor}
                                            id="source-author"
                                        />
                                    </div>
                                    <div className="footer-right">
                                        <TextControl
                                            label={__('Page', 'essay-card-topic-statement-generator')}
                                            value={sourceLocation}
                                            onChange={(value) => setAttributes({ sourceLocation: value })}
                                            placeholder={placeholders.sourceLocation}
                                            id="source-location"
                                        />
                                    </div>
                                </div>
                            )}
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
            showCitation,
        } = attributes;

        const blockProps = useBlockProps.save({
            className: 'wp-block-essay-notecard'
        });

        return (
            <div {...blockProps}>
                <div className="notecard">
                    <div className="notecard-header">
                        <div className="header-left">
                            <div className="topic-statement">{topicStatement}</div>
                        </div>
                        {showCitation && sourceTitle && (
                            <div className="header-right">
                                <div className="source-title-wrapper">
                                    <span className="entry-label">{__('Source:', 'essay-card-topic-statement-generator')}</span>
                                    <span className="source-title">{sourceTitle}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="notecard-body">
                        <RichText.Content
                            tagName="div"
                            className="supporting-text"
                            value={supportingText}
                        />
                    </div>

                    {showCitation && (
                        <div className="notecard-footer">
                            {sourceAuthor && (
                                <div className="footer-left">
                                    <span className="entry-label">{__('Author:', 'essay-card-topic-statement-generator')}</span>
                                    <span className="source-author">{sourceAuthor}</span>
                                </div>
                            )}
                            {sourceLocation && (
                                <div className="footer-right">
                                    <span className="entry-label">{__('Page:', 'essay-card-topic-statement-generator')}</span>
                                    <span className="source-location">{sourceLocation}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    },
});