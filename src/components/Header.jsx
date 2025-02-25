function Header() {
  return (
    <header className=" max-w-5xl m-auto mb-16 flex flex-row justify-center items-center gap-4">
      <img src='science.png' alt='React logo' className={` w-24 md:max-w-full`} />
      <h1 className={`text-3xl md:text-8xl`}>The React Quiz</h1>
    </header>
  );
}

export default Header;
