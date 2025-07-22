import { Asset } from 'expo-asset';

export default async function resolveAsset(
  fileReference: any
): Promise<Asset[]> {
  const urls: Asset[] = [];

  const files = Array.isArray(fileReference) ? fileReference : [fileReference];

  for (const file of files) {
    const asset = Asset.fromModule(file);
    await asset.downloadAsync();
    urls.push(asset);
  }

  return urls;
}

export async function stringFromAsset(
  asset: Asset | string
): Promise<string | null> {
  if (asset instanceof Asset) {
    if (!asset.localUri) {
      await asset.downloadAsync();
    }
    if (!asset.localUri) {
      console.warn(
        "Warning: Asset localUri is still null after download. This may happen for unsupported file types like .mtl"
      );
    }
    return asset.localUri || asset.uri;
  } else if (typeof asset === 'string') {
    return asset;
  }
  return null;
}
