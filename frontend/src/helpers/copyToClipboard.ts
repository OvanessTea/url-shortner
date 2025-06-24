export const copyToClipboard = async (text: string, setSuccess: (success: string) => void) => {
    try {
        const fullUrl = `${process.env.REACT_APP_API_URL}/${text}`;
        await navigator.clipboard.writeText(fullUrl);
        setSuccess('✅ Link copied to clipboard!');
        
        setTimeout(() => {
            setSuccess('');
        }, 1500);
    } catch (error) {
        console.error('Error copying link:', error);
        setSuccess('❌ Failed to copy link');
    }
};