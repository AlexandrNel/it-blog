"use client";

type Props = {
	uploadedImage?: string | null;
	onImageEdit?: (editedFile: File) => void;
};

export const ImageEditor = () => {
	return <div className="max-w-[800px] w-full max-h-[600px] h-full ">ImageEditor</div>;
};
