import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Img?: string;
  description: JSX.Element;
  isButton?: boolean;
  buttonLink?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Img: require('@site/static/img/AI-ContentWriter-icon.png').default,
    description: (
      <>
        Step-by-step guidance, product overviews, and quick answers to help you get started with ease.
      </>
    ),
  },
  {
    title: 'Business App',
    isButton: true,
    buttonLink: 'https://businessapp-docs-642433220657.us-central1.run.app/',
    description: (
      <>
        Access comprehensive Business App documentation and guides for partners and customers.
      </>
    ),
  },
  {
    title: 'AI-Powered Platform Documentation',
    Img: require('@site/static/img/AI-Receptionist-icon.png').default,
    description: (
      <>
        Discover how Vendasta AI tools streamline your workflows from content generation to campaign automation.
      </>
    ),
  },
  {
    title: 'Frequently Asked Questions (FAQs)',
    Img: require('@site/static/img/AI-SEOExpert-icon.png').default,
    description: (
      <>
        Dive into our most commonly asked questions to get fast, clear answers about setup, troubleshooting and more.
      </>
    ),
  },
];

function Feature({title, Img, description, isButton, buttonLink}: FeatureItem) {
  if (isButton && buttonLink) {
    return (
      <div className={clsx('col col--3')}>
        <div className="text--center">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.businessAppButton}
          >
            <div className={styles.buttonContent}>
              <span className={styles.arrow}>←</span>
              <span className={styles.buttonText}>{title}</span>
            </div>
          </a>
        </div>
        <div className="text--center padding-horiz--md">
          <p>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <img src={Img} className={styles.featureImage} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
