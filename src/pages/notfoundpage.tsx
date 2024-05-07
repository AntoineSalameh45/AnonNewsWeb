const NotFound = () => {
  const bgimg = 'src/assets/bg/img7.jpg';
  return (
    <div className="flex justify-center items-center bg-local min-h-[100vh] min-w-[100vw] bg-cover bg-center flex-col" style={{ backgroundImage: `url(${bgimg})` }}>
      <div className="bg-[#222222c4] p-4">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
