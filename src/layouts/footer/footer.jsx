import useTranslate from "../../hooks/useTranslate";

export default function Footer() {
	const translate = useTranslate("footer");

	return (
		<footer className="w-full dark:bg-dark-paper bg-light-paper">
			<div className="bg-light-background w-11/12 m-auto rounded-t-2xl dark:bg-dark-background text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{/* Column 1: Company */}
					<div>
						<h2 className="text-xl font-bold mb-4 text-dark-primary">
							{translate("company.title")}
						</h2>
						<ul className="space-y-2 text-sm">
							<li>
								<a className="hover:underline">{translate("company.item1")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("company.item2")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("company.item3")}</a>
							</li>
						</ul>
					</div>

					{/* Column 2: Support */}
					<div>
						<h2 className="text-xl font-bold mb-4 text-dark-primary">
							{translate("support.title")}
						</h2>
						<ul className="space-y-2 text-sm">
							<li>
								<a className="hover:underline">{translate("support.item1")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("support.item2")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("support.item3")}</a>
							</li>
						</ul>
					</div>

					{/* Column 3: Legal */}
					<div>
						<h2 className="text-xl font-bold mb-4 text-dark-primary">
							{translate("legal.title")}
						</h2>
						<ul className="space-y-2 text-sm">
							<li>
								<a className="hover:underline">{translate("legal.item1")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("legal.item2")}</a>
							</li>
							<li>
								<a className="hover:underline">{translate("legal.item3")}</a>
							</li>
						</ul>
					</div>

					{/* Column 4: Newsletter */}
					<div>
						<h2 className="text-xl font-bold mb-4 text-dark-primary">
							{translate("newsletter.title")}
						</h2>
						<p className="text-sm mb-3">
							{translate("newsletter.description")}
						</p>
						<div className="flex flex-col sm:flex-row gap-2">
							<input
								type="email"
								placeholder={translate("newsletter.placeholder")}
								className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm w-full"
							/>
							<button className="bg-dark-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition text-sm">
								{translate("newsletter.buttonText")}
							</button>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t dark:border-gray-700 border-gray-200 py-4 text-center text-sm text-gray-500">
					© {new Date().getFullYear()} {translate("copyright")}
				</div>
			</div>
		</footer>
	);
}
