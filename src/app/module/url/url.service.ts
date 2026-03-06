import { prisma } from "../../lib/prisma";
import { generateShortCode } from "./url.utils";

const createUrl = async (data: {
  originalUrl: string;
  customUrl?: string;
  userId?: string;
}) => {
  let shortCode = data.customUrl || generateShortCode();

  const exists = await prisma.url.findFirst({
    where: {
      OR: [{ shortUrl: shortCode }, { customUrl: shortCode }],
    },
  });

  if (exists) {
    throw new Error("Short URL already exists");
  }

  const url = await prisma.url.create({
    data: {
      originalUrl: data.originalUrl,
      shortUrl: data.customUrl ? generateShortCode() : shortCode,
      customUrl: data.customUrl,
      userId: data.userId,
    },
  });

  return url;
};

const getUserUrls = async (userId: string) => {
  return prisma.url.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const updateUrl = async (
  id: string,
  data: { originalUrl?: string; isActive?: boolean }
) => {
  return prisma.url.update({
    where: { id },
    data,
  });
};

const deleteUrl = async (id: string) => {
  return prisma.url.delete({
    where: { id },
  });
};

const getByShortCode = async (code: string) => {
  return prisma.url.findFirst({
    where: {
      OR: [{ shortUrl: code }, { customUrl: code }],
      isActive: true,
    },
  });
};

const increaseClicks = async (urlId: string) => {
  return prisma.url.update({
    where: { id: urlId },
    data: {
      clicks: { increment: 1 },
    },
  });
};

export const UrlService = {
  createUrl,
  getUserUrls,
  updateUrl,
  deleteUrl,
  getByShortCode,
  increaseClicks,
};