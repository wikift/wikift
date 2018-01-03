/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CommonPageModel } from '../../../shared/model/result/page.model';
import { ArticleService } from '../../../../services/article.service';
import { UserService } from '../../../../services/user.service';
import { SpaceService } from '../../../../services/space.service';

@Component({
    selector: 'wikift-space-info',
    templateUrl: 'space.info.component.html'
})

export class SpaceInfoComponent implements OnInit {

    // 分页数据
    page: CommonPageModel;
    // 当前页数
    currentPage: number;
    // 空间列表
    public spaces;
    maxSize = 15;

    constructor(private articleService: ArticleService,
        private userService: UserService,
        private spaceService: SpaceService) {
        this.page = new CommonPageModel();
        this.page.size = 24;
    }

    ngOnInit() {
    }

    pageChanged(event: any) {
        this.page.number = event.page - 1;
        this.spaceService.getAllSpaces(this.page).subscribe(
            result => {
                this.spaces = result.data.content;
                this.page = CommonPageModel.getPage(result.data);
            }
        );
    }

}