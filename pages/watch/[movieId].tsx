import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  
  // Função para verificar se a URL é do YouTube e extrair o ID do vídeo
  const isYouTubeURL = (url) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  };

  // Função para renderizar o player de vídeo adequado com base na URL
  const renderVideoPlayer = () => {
    if (data && isYouTubeURL(data.videoUrl)) {
      // Extrair o ID do vídeo do URL do YouTube
      const videoId = isYouTubeURL(data.videoUrl);
      
      // Construir a URL do vídeo incorporado do YouTube com o ID extraído
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      // Renderizar o iframe incorporado do YouTube
      return (
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={data.title}
          frameBorder="0"
          allowFullScreen
        />
      );
    } else if (data && data.videoUrl) {
      // Se a URL for uma URL de vídeo padrão, renderize um elemento de vídeo HTML padrão
      return <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>;
    } else {
      // Se não houver uma URL de vídeo válida, renderize uma mensagem de erro ou qualquer conteúdo alternativo desejado
      return <p>Não foi possível carregar o vídeo.</p>;
    }
  };

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Assistindo:</span> {data?.title}
        </p>
      </nav>
      {renderVideoPlayer()}
    </div>
  );
};

export default Watch;
