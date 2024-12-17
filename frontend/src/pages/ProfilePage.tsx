import { Camera, Loader2, Mail, User } from "lucide-react";
import { useSelectAuthActions, useSelectAuthUser } from "../store/selector";
import { useState } from "react";
import toast from "react-hot-toast";
import { authApi, fileApi } from "../services";

const ProfilePage = () => {
  const user = useSelectAuthUser();
  const { updateProfile } = useSelectAuthActions();
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || "");
  const defaultFormValue = {
    fullName: user?.fullName,
    avatar: user?.avatar,
  };
  const [formValue, setFormValue] = useState(defaultFormValue);

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    setLoading(true);
    if (!file) {
      toast.error("Upload file error");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Chỉ được phép tải lên các tệp hình ảnh (JPEG, PNG, GIF, WEBP)"
      );
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Image must be < 2MB.");
      return;
    }
    const formData = new FormData();
    console.log(file);
    formData.append("image", file);
    const imageUrl = await fileApi.uploadImage(formData);

    setPreviewAvatar(imageUrl.data);
    setFormValue({ ...formValue, avatar: imageUrl.data });
    toast.success("Upload image success!");
    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(formValue);
      const updatedUser = await authApi.updateProfile(formValue);
      updateProfile(updatedUser.data);
      toast.success("Update Profile success!");

      setLoading(false);
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2"> Your profile information</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={
                    previewAvatar ||
                    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
                  }
                  alt=""
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-x-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    loading ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      handleUploadImage(e);
                    }}
                    disabled={loading}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {loading
                  ? "Uploading..."
                  : "Click the camera to update your avatar"}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <input
                  name="fullName"
                  onChange={(e) =>
                    setFormValue({ ...formValue, fullName: e.target.value })
                  }
                  defaultValue={user?.fullName}
                  className="px-4 w-full h-10 py-205 bg-base-200 rounded-lg border"
                ></input>
              </div>
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <input
                  disabled
                
                  name="email"
                  defaultValue={user?.email}
                  className="px-4 w-full h-10 py-205 bg-base-300 rounded-lg border"
                ></input>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
