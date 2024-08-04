import { Controller, Get } from "@nestjs/common";

@Controller('/tracks')
export class TrackController {
  createTrack() {

  }

  @Get()
  getAllTracks() {
    return "Controller working"
  }

  getOneTrack(trackId: number) {

  }

  deleteTrack(trackId: number) {

  }
}