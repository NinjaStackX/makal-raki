"use client";
import React from "react";
import ArticleSideBar from "./ArticleSideBar";
import UserDataExplorer, { ActionsBar } from "./UserDataExplorer";
import useDialog from "@/hooks/useDialog";
import { FormArticle, FormUser } from "./Forms";
import { createArticle, updateArticle } from "@/serverActions/article";
import { pr } from "@/lib/pr";
import FramDialog from "@/components/UI/FramDialog";
import { createUser, updateUserDetails } from "@/serverActions/user";

const DashBoard = ({ articles, users }: any) => {
  const UpdateArticleDialog = useDialog({ typ: "update" });
  const UpdateUserDialog = useDialog({ typ: "update" });
  const CreateArticleDialog = useDialog({ typ: "create" });
  const CreateUserDialog = useDialog({ typ: "create" });

  return (
    <>
      {CreateArticleDialog.open && (
        <FramDialog close={CreateArticleDialog.toggleDialog}>
          <FormArticle
            action={createArticle}
            handleClose={() => CreateArticleDialog.setOpen(false)}
            article={CreateArticleDialog.item}
          />
        </FramDialog>
      )}
      {CreateUserDialog.open && (
        <FramDialog close={() => CreateUserDialog.setOpen(false)}>
          <FormUser
            action={createUser}
            handleClose={() => CreateUserDialog.setOpen(false)}
            user={CreateUserDialog.item}
          />
        </FramDialog>
      )}
      {UpdateUserDialog.open && (
        <FramDialog close={UpdateUserDialog.toggleDialog}>
          <FormUser
            action={updateUserDetails}
            handleClose={UpdateUserDialog.toggleDialog}
            user={UpdateUserDialog.item}
          />
        </FramDialog>
      )}
      {UpdateArticleDialog.open && (
        <FramDialog close={UpdateArticleDialog.toggleDialog}>
          <FormArticle
            action={updateArticle}
            handleClose={UpdateArticleDialog.toggleDialog}
            article={UpdateArticleDialog.item}
          />
        </FramDialog>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3 xl:w-1/4 space-y-6">
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                إدارة المحتوى
              </h2>
              <p className="text-sm text-gray-500">مشاهدة جميع المقالات</p>
            </div>

            <ArticleSideBar
              articles={articles}
              UpdateArticleDialog={UpdateArticleDialog}
            />
          </div>
        </aside>
        {/* الجانب الأيمن: استعراض البيانات (Main Content) */}
        <section className="flex-1">
          <ActionsBar Dialog={CreateUserDialog} />
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-screen">
            <UserDataExplorer
              users={users}
              UpdateArticleDialog={UpdateArticleDialog}
              UpdateUserDialog={UpdateUserDialog}
              CreateArticleDialog={CreateArticleDialog}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
