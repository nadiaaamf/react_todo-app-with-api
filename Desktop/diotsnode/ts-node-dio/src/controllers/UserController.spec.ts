import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nadia',
                email: 'nadia@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar erro se o name não for informado', () => {
    const mockRequest = {
        body: {
            email: 'nadia@test.com'
        }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
        message: 'Bad request! Name obrigatório'
    })
})

    it('Deve chamar getAllUsers', () => {
      const mockResponse = makeMockResponse()
      const getAllUsersMock = jest.spyOn(mockUserService, 'getAllUsers').mockReturnValue([])
      userController.getAllUsers({} as Request, mockResponse)
      expect(getAllUsersMock).toHaveBeenCalled()
      expect(mockResponse.state.status).toBe(200)

    })

    it('Deve retornar erro se o email não for informado', () => {
      const mockResquest = {
        body: {
        name: 'Nadia'
        }
      } as Request

      const mockResponse = makeMockResponse()
      userController.createUser(mockResquest, mockResponse)

      expect(mockResponse.state.status).toBe(400)
      expect(mockResponse.state.json).toMatchObject({
        message: 'Bad request! Email obrigatório'
      })
    })

    it('Deve deletar um usuário', () => {
      const deleteUserMock = jest.spyOn(mockUserService, 'deleteUser').mockReturnValue()
      const mockRequest = {
        body: {
          email: 'nadia@test.com'
        }
      } as Request

      const mockResponse = makeMockResponse()

      userController.deleteUser(mockRequest, mockResponse)

      expect(deleteUserMock).toHaveBeenCalledWith('nadia@test.com')
      expect(mockResponse.state.status).toBe(200)
      expect(mockResponse.state.json).toMatchObject({
        message: 'Usuário deletado'
      })
    })
})