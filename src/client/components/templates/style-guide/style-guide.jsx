import React from 'react';
import '../../../styles/global.scss';
import styles from './style-guide.scss'


 const StyleGuide = () => 
	<div>
		<Typography />
		<Links />
		<ColorPalette />
	</div>;

export default StyleGuide;


 const Typography = () => 
	<div>
		<h1 class="extra-large-title">h1:xl Source Sans Pro Black</h1>
		<h1>h1 Source Sans Pro Black</h1>
		<h2>h2 Source Sans Pro Black</h2>
		<h3>h3 Source Sans Pro Black</h3>
		<h4>h4 Source Sans Pro Bold</h4>
		<h5>h5 Merriweather Regular</h5>
		<h5 class="subtitle">h5:subtitle Merriweather Regular Italic 24px</h5>
		<h6>h6 Source Sans Pro Bold 18px</h6>
		<p>Body style Source Sans Pro Regular 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.
		</p>
		<p>This is just to show spacing between paragraphcs: ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim.</p>
		<p class="caption">Image Caption: Source Sans Pro Regular Italic 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor.</p>	
	</div>;

 const Links = () => 
 	<div>
 		<p><a href="#">Link</a></p>
 	</div>;

 const ColorPalette = () => 
 	<div>
 		<div class="column">
		    <h4>SBA Blue</h4>
		    <div class="color color-primary sba-blue">
		        <p class="color-name">sba-blue</p>
		        <p className={ styles.colorhex }>#0b97DD</p>
		    </div>
		    <div class="color color-secondary sba-blue-darkest">
		        <p class="color-name">sba-blue-darkest</p>
		        <p class="color-hex">#004265</p>
		    </div>
		    <div class="color color-secondary sba-blue-dark">
		        <p class="color-name">sba-blue-dark</p>
		        <p class="color-hex">#006BA2</p>
		    </div>
		    <div class="color color-secondary sba-blue-light text-black">
		        <p class="color-name">sba-blue-light</p>
		        <p class="color-hex">#9DDDFF</p>
		    </div>
		    <div class="color color-secondary sba-blue-lightest text-black">
		        <p class="color-name">sba-blue-lightest</p>
		        <p class="color-hex">#D6ECFC</p>
		    </div>
		</div>
		<div class="column">
		    <h4>Byzantine</h4>
		    <div class="color color-primary byzantine">
		        <p class="color-name">byzantine</p>
		        <p class="color-hex">#AB3EA0</p>
		    </div>
		    <div class="color color-secondary byzantine-darkest">
		        <p class="color-name">byzantine-darkest</p>
		        <p class="color-hex">#511D4C</p>
		    </div>
		    <div class="color color-secondary byzantine-dark">
		        <p class="color-name">byzantine-dark</p>
		        <p class="color-hex">#7E2E76</p>
		    </div>
		    <div class="color color-secondary byzantine-light">
		        <p class="color-name">byzantine-light</p>
		        <p class="color-hex">#C661BB</p>
		    </div>
		    <div class="color color-secondary byzantine-lightest">
		        <p class="color-name">byzantine-lightest</p>
		        <p class="color-hex">#C661BB</p>
		    </div>
		</div>
		<div class="column">
		    <h4>Money Green</h4>
		    <div class="color color-primary money-green">
		        <p class="color-name">money-green</p>
		        <p class="color-hex">#609F00</p>
		    </div>
		    <div class="color color-secondary money-green-darkest">
		        <p class="color-name">money-green-darkest</p>
		        <p class="color-hex">#1F3A00</p>
		    </div>
		    <div class="color color-secondary money-green-dark">
		        <p class="color-name">money-green-dark</p>
		        <p class="color-hex">#336200</p>
		    </div>
		    <div class="color color-secondary money-green-light">
		        <p class="color-name">money-green-light</p>
		        <p class="color-hex">#8BC03B</p>
		    </div>
		    <div class="color color-secondary money-green-lightest">
		        <p class="color-name">money-green-lightest</p>
		        <p class="color-hex">#DBEDC0</p>
		    </div>
		</div>
		<div class="column">
		    <h4>Cobalt Blue</h4>
		    <div class="color color-primary cobalt-blue">
		        <p class="color-name">cobalt-blue</p>
		        <p class="color-hex">#609F00</p>
		    </div>
		    <div class="color color-secondary cobalt-blue-darkest">
		        <p class="color-name">cobalt-blue-darkest</p>
		        <p class="color-hex">#1F3A00</p>
		    </div>
		    <div class="color color-secondary cobalt-blue-dark">
		        <p class="color-name">cobalt-blue-dark</p>
		        <p class="color-hex">#336200</p>
		    </div>
		    <div class="color color-secondary cobalt-blue-light">
		        <p class="color-name">cobalt-blue-light</p>
		        <p class="color-hex">#8BC03B</p>
		    </div>
		    <div class="color color-secondary cobalt-blue-lightest">
		        <p class="color-name">money-green-lightest</p>
		        <p class="color-hex">#DBEDC0</p>
		    </div>
		</div>
 	</div>;

