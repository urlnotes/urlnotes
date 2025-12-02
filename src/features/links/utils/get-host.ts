export const getHostFromUrl = (url: string) => {
    return new URL(url).hostname.replace('www.', '');
}