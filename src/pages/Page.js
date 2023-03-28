import React, { useEffect, useRef } from 'react';


function Page(props) {

  const { pageTitle, hideTitle } = props;
  const previousTitleRef = useRef(document.title);


  useEffect(() => {

    const previousTitle = previousTitleRef.current;
    document.title = `Lotus | ${pageTitle}`;
    return () => {
      document.title = previousTitle;
    };

  }, [pageTitle]);


  return (
    <div>
      {!hideTitle && <h1>{pageTitle}</h1>}
      {/* Sisipkan konten halaman di sini */}
    </div>
  );
  
}


export default Page;