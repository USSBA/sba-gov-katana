import React from 'react';
import { Callout } from 'molecules';
import styles from './hero.scss';
import { ArrowAnchorButton } from 'atoms';
import Waypoint from 'react-waypoint';

class Hero extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorButton: true,
    };
  }

  componentDidMount() {
    this.props.anchorButton &&
      window.addEventListener('scroll', this.removeAnchorButton.bind(this));
  }

  imgStyles() {
    return {
      background: 'url(' + this.props.imageUrl + ') no-repeat center center',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
    };
  }

  removeAnchorButton() {
    this.state.anchorButton &&
      this.setState({ anchorButton: false }, () => {
        window.removeEventListener('scroll', this.removeAnchorButton.bind(this));
      });
  }

  render() {
    return (
      <div className={styles.heroContainer}>
        {this.props.imageUrl && (
          <div className="hero">
            <div className={styles.heroMobileImageContainer}>
              <div className="hero-image-mobile" title={this.props.alt} style={this.imgStyles()} />
            </div>
            <img className={`hero-image-desktop ${styles.heroDesktopImage}`} src={this.props.imageUrl} alt={this.props.alt}/>
            <div className={`hero-callout ${styles.callout}`}>
              <Callout
                title={this.props.title}
                message={this.props.message}
                buttons={this.props.buttons}
              />
            </div>
          </div>
        )}
        {!this.props.imageUrl && (
          <div className={`hero-noimage ${styles.inHeroWithNoImage}`}>
            <div className={`hero-callout ${styles.calloutContainer}`}>
              <Callout
                inHeroWithNoImage={true}
                title={this.props.title}
                message={this.props.message}
                buttons={this.props.buttons}
              />
            </div>
          </div>
        )}
        {this.props.anchorButton &&
          (this.state.anchorButton && (
            <div className={styles.anchorButton}>
              <ArrowAnchorButton
                onClick={() => {
                  this.removeAnchorButton();
                }}
              />
            </div>
          ))}
        <Waypoint
          onLeave={() => {
            this.removeAnchorButton();
          }}
        />
      </div>
    );
  }
}

export default Hero;
