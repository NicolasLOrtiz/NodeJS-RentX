import { Specification } from "../../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void;
  findbyName(name: string): Specification | undefined;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
