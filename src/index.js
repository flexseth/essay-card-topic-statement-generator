import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    TextControl,
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
                    <CardHeader className="notecard-header">
                        <div className="header-left">
                            <TextControl
                                label={__('Topic Statement', 'essay-card-topic-statement-generator')}
                                value={topicStatement}
                                onChange={(value) => setAttributes({ topicStatement: value })}
                                placeholder={placeholders.topicStatement}
                                id="topic-statement"
                            />
                        </div>
                        <div className="header-right">
                            <TextControl
                                label={__('Source Title', 'essay-card-topic-statement-generator')}
                                value={sourceTitle}
                                onChange={(value) => setAttributes({ sourceTitle: value })}
                                placeholder={placeholders.sourceTitle}
                                id="source-title"
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
                            id="supporting-text"
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

                    <CardFooter className="notecard-footer">
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
                                label={__('Page Number/URL', 'essay-card-topic-statement-generator')}
                                value={sourceLocation}
                                onChange={(value) => setAttributes({ sourceLocation: value })}
                                placeholder={placeholders.sourceLocation}
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
                <div className="notecard">
                    <div className="notecard-header">
                        <div className="header-left">
                            <div className="topic-statement">{topicStatement}</div>
                        </div>
                        <div className="header-right">
                            <div className="source-title-wrapper">
                                <span className="entry-label">{__('Source:', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-title">{sourceTitle}</div>
                            </div>
                        </div>
                    </div>

                    <div className="notecard-body">
                        <RichText.Content
                            tagName="div"
                            className="supporting-text"
                            value={supportingText}
                        />
                    </div>

                    <div className="notecard-footer">
                        <div className="footer-left">
                            <div className="source-author-wrapper">
                                <span className="entry-label">{__('Author:', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-author">{sourceAuthor}</div>
                            </div>
                        </div>
                        <div className="footer-right">
                            <div className="source-location-wrapper">
                                <span className="entry-label">{__('Page:', 'essay-card-topic-statement-generator')}</span>
                                <div className="source-location">{sourceLocation}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});