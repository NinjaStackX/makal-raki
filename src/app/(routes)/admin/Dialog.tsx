"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { creatItem, delItem, updateItem } from "@/actions/curd";
import { X } from "lucide-react";

const Dialog = ({
  s,
  setS,
  authors,
}: {
  s: any;
  setS: (val: any) => void;
  authors: any[];
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      authorId: Number(formData.get("authorId")),
      published: formData.get("published") === "on",
    };

    try {
      await creatItem(s[1], data);
      router.refresh();
      setS(false);
    } catch (error) {
      alert("Please make sure you selected a valid author.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      authorId: Number(formData.get("authorId")),
      published: formData.get("published") === "on",
    };

    try {
      // Assuming s[1] is the ID
      await updateItem(s[1], s[2], data);
      router.refresh();
      setS(false);
    } catch (error) {
      alert("Failed to update article.");
    } finally {
      setLoading(false);
    }
  };

  function FormArticle() {
    return (
      <div className="max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Article</h2>
          <button type="button" onClick={() => setS(false)}>
            <X className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Article title..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Author
            </label>
            <select
              name="authorId"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Choose an author...</option>
              {authors?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="body"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <span className="text-sm font-medium text-gray-700">
              Publish immediately?
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                name="published"
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Article"}
          </button>
        </form>
      </div>
    );
  }

  function FormArticleUpdate() {
    // Assuming s[2] contains the article data to be updated
    const articleData = s[2] || {};

    return (
      <div className="max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Article</h2>
          <button type="button" onClick={() => setS(false)}>
            <X className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={articleData.title}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Author
            </label>
            <select
              name="authorId"
              required
              defaultValue={articleData.authorId}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Choose an author...</option>
              {authors?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="body"
              rows={4}
              required
              defaultValue={articleData.body}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <span className="text-sm font-medium text-gray-700">
              Published?
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                name="published"
                type="checkbox"
                defaultChecked={articleData.published}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Article"}
          </button>
        </form>
      </div>
    );
  }

  if (!s || s.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {s[0] === "create" && <FormArticle />}
      {s[0] === "update" && <FormArticleUpdate />}

      {s[0] === "delete" && (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item?
          </p>
          <div className="flex gap-3">
            <button
              className="flex-1 bg-gray-100 py-2 rounded-lg"
              onClick={() => setS(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              onClick={async () => {
                await delItem(s[1], s[2]);
                router.refresh();
                setS(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
