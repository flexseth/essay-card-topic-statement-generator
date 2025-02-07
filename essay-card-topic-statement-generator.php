<?php
/**
 * Plugin Name: Essay Card Topic Statement Generator
 * Plugin URI: https://flexperception.com/essay-card-topic-statement-generator
 * Description: Notecards for research essays
 * Version: 0.1.1
 * Requires at least: 5.2
 * Requires PHP: 6.0
 * Author: Seth Miller
 * Author URI: https://flexperception.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: essay-card-topic-statement-generator
 * Domain Path: /languages
 *
 * @package essay-card-topic-statement-generator
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the block and its assets.
 */
function essay_card_topic_statement_generator_init() {
    // Verify dependencies.
    if (!function_exists('register_block_type')) {
        return;
    }

    // Register block scripts and styles.
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'essay-card-topic-statement-generator',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    wp_register_style(
        'essay-card-topic-statement-generator-editor',
        plugins_url('build/index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // Register the block.
    register_block_type('essay-card-topic-statement-generator/notecard', array(
        'editor_script' => 'essay-card-topic-statement-generator',
        'editor_style' => 'essay-card-topic-statement-generator-editor',
        'style' => 'essay-card-topic-statement-generator',
    ));
}
add_action('init', 'essay_card_topic_statement_generator_init');

/**
 * Load text domain for internationalization.
 */
function essay_card_topic_statement_generator_load_textdomain() {
    load_plugin_textdomain(
        'essay-card-topic-statement-generator',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('init', 'essay_card_topic_statement_generator_load_textdomain');