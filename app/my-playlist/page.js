"use client";
import { AuthProvider } from "../../providers/auth-provider";
import { useCallback, useEffect, useState } from "react";
import requestData from "../../lib/api";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { formatNumber } from "../../lib/utils";
import { MdOutlinePlaylistPlay } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPencil, LuTrash } from "react-icons/lu";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [playlist, setPlaylist] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [playlistToUpdate, setPlaylistToUpdate] = useState(null);
  const [newName, setNewName] = useState("");

  const getPlaylist = useCallback(async () => {
    const result = await requestData("/user/playlist");
    if (result) {
      const data = result.figure;
      setPlaylist(() => data);
    }
  }, []);

  const deletePlaylist = async (id) => {
    try {
      const currentData = playlist?.filter((item) => item?.id !== id);
      setPlaylist(currentData);
      /* await requestData(`/user/playlist/${id}`, { method: "DELETE" });
      getPlaylist();  */
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const updatePlaylist = async () => {
    try {
      /* await requestData(`/user/playlist/${playlistToUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: newName }),
      });
      getPlaylist(); */

      const findData = playlist?.find(
        (item) => item?.id == playlistToUpdate.id
      );
      // updateName?.name = newName
      if (findData) {
        const updatedPlaylist = playlist.map((item) =>
          item.id === findData.id ? { ...item, name: newName } : item
        );
        setPlaylist(updatedPlaylist);
      }
      // return console.log(updateName, [...playlist, updateName]);
      // setPlaylist({...playlist, updateName});
      // return console.log(updateName, newName);
      setOpenUpdateModal(false);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [getPlaylist]);

  // console.log(playlist);

  return (
    <AuthProvider>
      <div className="py-3">
        <h1 className="text-4xl">প্লে লিস্ট সমূহ</h1>
      </div>

      <div className="py-3 play-list-area flex">
        {playlist.map((item, index) => (
          <div
            // href={`/watch/6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah?plSl=${"6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah"}&plst=${true}`}
            key={index}
            className="basis-1/5 aspect-video play-list-item"
          >
            <div className="p-2  ">
              <div className="space-y-3">
                <div className="rounded overflow-hidden relative">
                  <Link
                    href={`/watch/6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah?plSl=${"6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah"}&plst=${true}`}
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={
                          item.thumbnail ??
                          "https://www.ungerglobal.com/en/products/static/version1734619323/frontend/Unger/default/en_US/Sunzinet_GDPR/images/youtube-cover.png"
                        }
                        alt="avatar"
                        width="1000"
                        height="1000"
                        className="object-contain"
                      />
                    </AspectRatio>
                    <span className="p-1 px-2 bg-black text-white absolute right-0 bottom-0 rounded-tl opacity-70">
                      <MdOutlinePlaylistPlay className="inline-block" />
                      {formatNumber(item.total_videos)} টি ভিডিও
                    </span>
                  </Link>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/watch/6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah?plSl=${"6-koti-45-lksh-taka-tran-deya-sesh-hlo-sheikh-ahmadullah"}&plst=${true}`}
                  >
                    <p className="text-md font-semibold">{item.name}</p>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-0 py-1">
                      <DropdownMenuItem
                        onClick={() => {
                          setPlaylistToDelete(item);
                          setOpenDeleteModal(true);
                        }}
                        className="cursor-pointer"
                      >
                        <LuTrash />
                        <span>মুছে ফেলুন</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setPlaylistToUpdate(item);
                          setNewName(item.name);
                          setOpenUpdateModal(true);
                        }}
                        className="cursor-pointer text-sm"
                      >
                        <LuPencil />
                        <span>নাম পরিবর্তন করুন</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <div className="space-y-3">
            <h3 className="text-3xl text-black">প্লে-লিস্টটি মুছে ফেলা</h3>
            <p className="text-gray-500">
              আপনি কি প্লে-লিস্টটি নিশ্চিত ভাবে মুছে ফেলতে চাচ্ছেন?
            </p>
          </div>

          <div className="p-3 space-x-3 flex justify-end">
            <Button onClick={() => setOpenDeleteModal(false)} variant="outline">
              বাতিল করুন
            </Button>
            <Button
              onClick={() => deletePlaylist(playlistToDelete.id)}
              variant="destructive"
            >
              মুছুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
        <DialogContent>
          <div className="space-y-3">
            <h3 className="text-3xl text-black">প্লে-লিস্টের নাম পরিবর্তন</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 w-full"
              placeholder="নতুন নাম লিখুন"
            />
          </div>

          <div className="p-3 space-x-3 flex justify-end">
            <Button onClick={() => setOpenUpdateModal(false)} variant="outline">
              বাতিল করুন
            </Button>
            <Button onClick={updatePlaylist} variant="primary">
              সংরক্ষণ করুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AuthProvider>
  );
}
