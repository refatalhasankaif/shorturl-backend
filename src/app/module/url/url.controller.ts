import { Request, Response } from "express";
import { UrlService } from "./url.service";

const createUrl = async (req: Request, res: Response) => {
  const user = req.user;

  const url = await UrlService.createUrl({
    originalUrl: req.body.originalUrl,
    customUrl: req.body.customUrl,
    userId: user?.id,
  });

  res.status(201).json({
    success: true,
    data: url,
  });
};

const getMyUrls = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const urls = await UrlService.getUserUrls(user.id);

  res.json({
    success: true,
    data: urls,
  });
};

const updateUrl = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const url = await UrlService.updateUrl(id, req.body);

  res.json({
    success: true,
    data: url,
  });
};

const deleteUrl = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await UrlService.deleteUrl(id);

  res.json({
    success: true,
    message: "URL deleted",
  });
};

export const UrlController = {
  createUrl,
  getMyUrls,
  updateUrl,
  deleteUrl,
};