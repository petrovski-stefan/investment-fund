const InfinitcodeLinkElement = (
  <span className="text-black md:text-green-600">
    <a href="https://www.linkedin.com/company/infinitcode/">Infinitcode</a>
  </span>
);

const SPLinkElement = (
  <span className="text-black md:text-green-600">
    <a href="https://www.linkedin.com/in/stefan-petrovski-8258b7259/">Stefan Petrovski</a>
  </span>
);

export const Footer = () => {
  return (
    <footer className="w-full h-[5vh] text-xs md:text-base border-t-2">
      <p className="text-center">
        &copy; {InfinitcodeLinkElement} & {SPLinkElement} - Internship technical interview task 2024
      </p>
    </footer>
  );
};
