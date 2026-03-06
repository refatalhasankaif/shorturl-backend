import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes/indexRoutes";
import notFound from "./app/middleware/notFound";
import { UrlService } from "./app/module/url/url.service";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', IndexRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is working',
  });
});

app.get("/:code", async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const url = await UrlService.getByShortCode(code);

    if (!url) {
      return res.status(404).send("URL not found");
    }

    await UrlService.increaseClicks(url.id);

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Redirect failed",
    });
  }
});

app.use(notFound)

export default app;