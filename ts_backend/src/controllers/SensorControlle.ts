import { PrismaClient } from '@prisma/client'
import { Request, Response} from 'express'

const prisma = new PrismaClient()

class SensorController {
  async index (req: Request, res: Response) {
    const sensors = await prisma.sensors.findMany()

    return res.json(sensors)
  }
}

export default SensorController