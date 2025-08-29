export default function NotFound() {
	return (
		/* NotFound Page */
		<div className="h-[80vh] dark:bg-dark-paper bg-light-paper rounded-xl flex flex-col gap-6 items-center justify-center text-center p-6">
			<h2 className="text-2xl md:text-3xl font-bold">404 Page Not Found</h2>
			<img
				src="https://media.giphy.com/media/hEc4k5pN17GZq/giphy.gif"
				alt="404 not found"
				className="md:w-[600px] w-full h-[350px] md:h-[500px] rounded-lg "
				loading="lazy"
			/>
			<p className="text-lg lg:text-xl mb-6 max-w-xl">
				Looks like you're lost in space. The page you're looking for isn't here.
			</p>
		</div>
	);
}
