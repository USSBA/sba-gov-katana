import React from 'react';
import ExtraLargeTitleText from '../../atoms/extra-large-title-text/extra-large-title-text.jsx';
import SubtitleText from '../../atoms/subtitle-text/subtitle-text.jsx';
import CaptionText from '../../atoms/caption-text/caption-text.jsx';

import LargePrimaryButton from '../../atoms/large-primary-button/large-primary-button.jsx';
import LargeSecondaryButton from '../../atoms/large-secondary-button/large-secondary-button.jsx';
import LargeInversePrimaryButton from '../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx';
import LargeInverseSecondaryButton from '../../atoms/large-inverse-secondary-button/large-inverse-secondary-button.jsx';


import SmallPrimaryButton from '../../atoms/small-primary-button/small-primary-button.jsx';
import SmallSecondaryButton from '../../atoms/small-secondary-button/small-secondary-button.jsx';
import SmallInversePrimaryButton from '../../atoms/small-inverse-primary-button/small-inverse-primary-button.jsx';
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';


import SbaModal from '../../molecules/modal.jsx';
import Callout from '../../molecules/callout/callout.jsx';
import Hero from '../../organisms/hero/hero.jsx';
import styles from './style-guide.scss';


 const StyleGuide = () =>
	<div>
			<Typography />
			<ButtonGroup/>
			<ColorPalette />
	</div>;

export default StyleGuide;

 const Typography = () =>
	<div className={ styles.typography }>
		<ExtraLargeTitleText text="XL:h1 Source Sans Pro Black" />
		<h1>h1 Source Sans Pro Black</h1>
		<h2>h2 Source Sans Pro Black</h2>
		<h3>h3 Source Sans Pro Black</h3>
		<h4>h4 Source Sans Pro Bold</h4>
		<h5>h5 Merriweather Regular</h5>
		<SubtitleText text="h5:subtitle Merriweather Regular Italic" />
		<h6>h6 Source Sans Pro Bold 18px</h6>
		<p>Body style Source Sans Pro Regular 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim. Fusce mattis justo vitae congue varius. Suspendisse auctor dapibus ornare. Praesent venenatis lacus a sem interdum tempor et vitae magna. Aenean vel consectetur odio. Curabitur malesuada scelerisque massa varius volutpat.
		</p>
		<p>This is just to show spacing between paragraphcs: ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor. Vestibulum et lacus a tellus sodales iaculis id vel dui. Etiam euismod lacus ornare risus egestas dignissim.</p>
		<CaptionText text="Image Caption: Source Sans Pro Regular Italic 18px. ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, nibh pellentesque vestibulum mattis, lacus tortor posuere nulla, vel sagittis risus mauris ac tortor." />
	</div>;


 const Buttons = () =>
 	<div className={ styles.buttons }>
 		<p><a href="#">Link</a></p>
 		<br />

 		<h4>Primary</h4>
 		<LargePrimaryButton text="Large Button" />
		<br />
		<SmallPrimaryButton text="Small Button" />
		<br />

		<h4>Secondary</h4>
		<LargeSecondaryButton text="Large Button" />
		<br />
		<SmallSecondaryButton text="Small Button" />
		<br />

		<h4>Inverse Primary</h4>
		<div className={ styles.background }>
		<LargeInversePrimaryButton text="Large Button" />
		<br />
		<SmallInversePrimaryButton text="Small Button" />
		</div>

		<h4>Inverse Secondary</h4>
		<div className={ styles.background }>
		<LargeInverseSecondaryButton text="Large Button" />
		<br />
		<SmallInverseSecondaryButton text="Small Button" />
		</div>

	</div>;

 const ButtonGroup = () =>
 	<div>
 	<div className="sba-blue">
 		<Buttons className={ styles.buttons}/>
 		</div>
<div className="byzantine">
 		<Buttons className={ styles.buttons}/>
 		</div>
<div className="money-green">
 		<Buttons className={ styles.buttons}/>
 		</div>
<div className="cobalt-blue">
 		<Buttons className={ styles.buttons}/>

</div>
 	</div>;

 const ColorPalette = () =>
 	<div>
 		<div className={ styles.column }>
		    <h4>SBA Blue</h4>
		    <div className={ styles.color + ' ' + styles.colorprimary + ' ' + styles.sbablue }>
		        <p className={ styles.colorName }>$sba-blue</p>
		        <p className={ styles.colorHex }>#0b97DD</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluedarkest }>
		        <p className={ styles.colorName }>$sba-blue-darkest</p>
		        <p className={ styles.colorHex }>#004265</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluedark }>
		        <p className={ styles.colorName }>$sba-blue-dark</p>
		        <p className={ styles.colorHex }>#006BA2</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluelight + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$sba-blue-light</p>
		        <p className={ styles.colorHex }>#9DDDFF</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.sbabluelightest + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$sba-blue-lightest</p>
		        <p className={ styles.colorHex }>#D6ECFC</p>
		    </div>
		</div>
		<div className={ styles.column }>
		    <h4>Byzantine</h4>
		    <div className={ styles.color + ' ' + styles.colorprimary + ' ' + styles.byzantine }>
		        <p className={ styles.colorName }>$byzantine</p>
		        <p className={ styles.colorHex }>#AB3EA0</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinedarkest }>
		        <p className={ styles.colorName }>$byzantine-darkest</p>
		        <p className={ styles.colorHex }>#511D4C</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinedark }>
		        <p className={ styles.colorName }>$byzantine-dark</p>
		        <p className={ styles.colorHex }>#7E2E76</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinelight }>
		        <p className={ styles.colorName }>$byzantine-light</p>
		        <p className={ styles.colorHex }>#C661BB</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.byzantinelightest + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$byzantine-lightest</p>
		        <p className={ styles.colorHex }>#C661BB</p>
		    </div>
		</div>
		<div className={ styles.column }>
		    <h4>Money Green</h4>
		    <div className={ styles.color + ' ' + styles.colorprimary + ' ' + styles.moneygreen }>
		        <p className={ styles.colorName }>$money-green</p>
		        <p className={ styles.colorHex }>#609F00</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreendarkest }>
		        <p className={ styles.colorName }>$money-green-darkest</p>
		        <p className={ styles.colorHex }>#1F3A00</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreendark }>
		        <p className={ styles.colorName }>$money-green-dark</p>
		        <p className={ styles.colorHex }>#336200</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreenlight + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$money-green-light</p>
		        <p className={ styles.colorHex }>#8BC03B</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.moneygreenlightest + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$money-green-lightest</p>
		        <p className={ styles.colorHex }>#DBEDC0</p>
		    </div>
		</div>
		<div className={ styles.column }>
		    <h4>Cobalt Blue</h4>
		    <div className={ styles.color + ' ' + styles.colorprimary + ' ' + styles.cobaltblue }>
		        <p className={ styles.colorName }>$cobalt-blue</p>
		        <p className={ styles.colorHex }>#609F00</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluedarkest }>
		        <p className={ styles.colorName }>$cobalt-blue-darkest</p>
		        <p className={ styles.colorHex }>#1F3A00</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluedark }>
		        <p className={ styles.colorName }>$cobalt-blue-dark</p>
		        <p className={ styles.colorHex }>#336200</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluelight + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$cobalt-blue-light</p>
		        <p className={ styles.colorHex }>#8BC03B</p>
		    </div>
		    <div className={ styles.color + ' ' + styles.colorsecondary + ' ' + styles.cobaltbluelightest + ' ' + styles.textblack }>
		        <p className={ styles.colorName }>$cobalt-blue-lightest</p>
		        <p className={ styles.colorHex }>#DBEDC0</p>
		    </div>
		</div>
 	</div>;

