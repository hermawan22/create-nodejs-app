const getFeatureFlag = (key: string, config: any) => {
  try {
    const featureFlags = process.env.FEATURE_FLAGS;
    if (!featureFlags) {
      return false;
    }
    if (config && config.defaultFlag && !~featureFlags.indexOf(key)) {
      return config.defaultFlag;
    }
    const parsedFeatureFlags = JSON.parse(featureFlags.replace(/'/g, '"'));
    return parsedFeatureFlags[key];
  } catch (e) {
    console.error(e);
    return '';
  }
}

export default getFeatureFlag;