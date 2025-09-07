import {Banner} from '@shopify/polaris';

export const ActivateExtentionCard = ({ deepLink } : { deepLink: string }) => {

  const handleEnableAppOnTheme = () => {
    const newTab = window.open(deepLink, '_blank');
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  return (
    <Banner title="Enable your app on your store theme"
      action={{content: 'Enable app on theme', onAction: handleEnableAppOnTheme}}
      tone="info"
      >
      <p>To make this app work on your store, you need to add it to your theme. This is a simple one-click process that connects the app to your store's design.</p>
    </Banner>
  )
}


