import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TreeService } from './tree.service';

describe('TreeService', () => {
  let treeService: TreeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TreeService
      ],
    });

    treeService = TestBed.get(TreeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should fetch data as an Observable`, async(inject([HttpTestingController, TreeService],
    (httpClient: HttpTestingController, treeService: TreeService) => {

      const testData = {
        "data": [
          {
            "name": "A",
            "description": "This is a description of A",
            "parentId": ""
          },
          {
            "name": "B",
            "description": "This is a description of B",
            "parent": "A"
          },
          {
            "name": "C",
            "description": "This is a description of C",
            "parent": "A"
          },
    ]
    };
    treeService.getData()
        .subscribe((data: any) => {
          expect(data.data.length).toBe(3);
        });

      let req = httpMock.expectOne('/api/data');
      expect(req.request.method).toBe("GET");

      req.flush(testData);
      httpMock.verify();

    })));
});