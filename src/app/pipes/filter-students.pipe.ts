import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStudents'
})
export class FilterStudentsPipe implements PipeTransform {

  transform(students: any[], searchTerm: string): any[] {
    if (!students) return [];
    if (!searchTerm) return students;

    searchTerm = searchTerm.toLowerCase();

    return students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm) ||
      student.lastName.toLowerCase().includes(searchTerm)
    );
  }
}
