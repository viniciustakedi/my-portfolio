import { Myself } from "@/assets/images";
import Tag from "@/components/elements/tag";
import Tooltip from "@/components/elements/tooltip";
import PlaylistModal from "@/components/modal/playlistModal";
import { PlaylistDataType, playlistData } from "@/services/mock/playlist";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCalendarClearSharp, IoMusicalNoteSharp, IoPersonSharp, IoPinSharp } from "react-icons/io5";
import { SiDatabricks } from "react-icons/si";
import { useInView } from "react-intersection-observer";

export default function AboutMe() {
  const [ref, inView] = useInView();

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const [musicContent, setMusicContent] = useState<{ image: any, artist: string, link: string }>({ image: '', artist: '', link: '' })

  const handleOpenPlaylistModal = (image: any, artist: string, link: string) => {
    setIsPlaylistModalOpen(true)
    setMusicContent({ image, artist, link })
  }

  return (
    <section id="about-me" className="flex flex-col lg:px-24 md:px-10 px-5 py-8">
      <div className="flex gap-16 lg:flex-row md:flex-row flex-col ">
        <div className=" lg:w-1/5 md:w-1/5 flex justify-end w-full">
          <Image className="w-full h-72 rounded-lg object-cover" src={Myself} alt="my-self-photo" />
        </div>
        <div className="lg:w-4/5 md:w-4/5 w-full">
          <Tag width="w-44" >Quem é o Takedi?</Tag>
          <h1 className="text-4xl mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue to-dark-blue">
            Sobre Mim
          </h1>
          <div className="flex lg:gap-3 md:gap-2 gap-1 lg:flex-row md:flex-rol lg:mb-0 md:mb-0 mb-2 flex-col">
            <div className="flex gap-1">
              <IoPersonSharp size={22} color="#748CAB" />
              <p className="text-lg text-gray-400 leading-6 mb-2 font-semibold">Vinicius Takedi</p>
            </div>
            <div className="flex gap-1">
              <IoCalendarClearSharp size={22} color="#748CAB" />
              <p className="text-lg text-gray-400 leading-6 mb-2 font-semibold">Mar, 2003 - 20 Anos</p>
            </div>
            <div className="flex gap-1">
              <IoPinSharp size={22} color="#748CAB" />
              <p className="text-lg text-gray-400 leading-6 mb-2 font-semibold">São Paulo, Brasil</p>
            </div>
          </div>
          <p className="text-lg text-gray-400 leading-6">
            Desde sempre gostei de computadores, mas a programação me veio atona quando eu tinha 16 anos,
            mas pensando bem, antes eu já tive contato com a programação, quando eu jogava Minecraft eu
            gostava de usar mods, plugins e configurar servidores para jogar com meus amigos, eu tive
            que configurar um "bucket" para abrir meu próprio servidor, e isso me fez ter uma vontade
            de entender como tudo aquilo realmente funcionava.
          </p>

          <p className="text-lg text-gray-400 leading-6 mt-2 mb-6">
            Após entrar na ETEC, eu ganhei uma bolsa para um curso de programação
            em blocos, patrocinado pelo Facebook. E a partir daquele momento eu tive certeza que eu queria ser
            um desenvolvedor de software, e desde então eu venho estudando e me aperfeiçoando cada vez mais.
            Caso não conheça programação em bloco, clique no botão abaixo para ver um exemplo.
          </p>

          <Link href="https://appinventor.mit.edu/about-us" target='_blank' className='flex justify-center p-2 w-36 rounded-lg gap-1 text-soft-blue font-bold hover:text-blue transition-all bg-white'>
            <SiDatabricks size={22} />
            Saber Mais
          </Link>

          <p className="text-lg text-gray-400 leading-6 mt-6">
            Durante esse curso de programação em blocos eu decidi que eu seria um programador. Então busquei os melhores
            cursos de programação que eu poderia fazer, e acabei encontrando o curso de Análise e Desenvolvimento de Sistemas
            fornecido pela Escola SENAI de informática, era e ainda é gratuito mas é necessário fazer e passar em um processo
            seletivo com muitos candidatos. E eu passei, e desde então eu venho estudando e me aperfeiçoando cada vez mais.
            Estou fazendo meu bacharelado em Ciência da Computação e é esperado que eu me torne um Cientista da Computação
            no final de 2024.
          </p>

          <div className="mt-12">
            <Tag width="w-44" >Músicas Favoritas</Tag>
            <div className="flex items-center">
              <IoMusicalNoteSharp size={38} color="#3E5C76" />
              <h1 className="text-4xl mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue to-dark-blue">
                Playlist Atual
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:w-full md:w-full gap-2 mt-2">
              {(
                playlistData.map((item: PlaylistDataType) => (
                  <Tooltip key={item.id} text={item.title}>
                    <div className="w-auto h-48 overflow-hidden rounded-lg bg-black cursor-pointer">
                      <Image
                        className="scale-110 hover:scale-125 w-full h-full object-cover hover:opacity-40 transition-all rounded-lg"
                        src={item.thumbnail}
                        alt={item.altThumbnail}
                        onClick={() => handleOpenPlaylistModal(item.thumbnail, item.artist, item.ytLink)}
                      />
                    </div>
                  </Tooltip>
                ))
              )}
              <PlaylistModal
                isOpen={isPlaylistModalOpen}
                onClose={setIsPlaylistModalOpen}
                musicContent={musicContent}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}