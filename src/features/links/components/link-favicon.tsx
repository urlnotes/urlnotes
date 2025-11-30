export function Favicon({url}: { url: string }) {
    return (
        <img
            className='size-4'
            src={`https://www.google.com/s2/favicons?domain=${url}`}
        />
    );
}